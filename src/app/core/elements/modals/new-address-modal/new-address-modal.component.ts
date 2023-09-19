import { AlertService } from './../../../services/alert.service';
import { Component, ElementRef, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Address } from 'src/app/core/models/address.model';
import { environment } from 'src/environments/environment';


declare var google: any;

@Component({
  selector: 'app-new-address-modal',
  templateUrl: './new-address-modal.component.html',
  styleUrls: ['./new-address-modal.component.css']
})
export class NewAddressModalComponent implements OnInit {

  mapsKey: string;
  @ViewChild('mapContainer', { static: false }) mapContainer: ElementRef | undefined;
  map: any;
  address: Address = new Address({});
  geocoder: any;
  addressString: string | undefined;
  private scriptLoaded: boolean = false; // Add this property to track whether the script has been loaded


  constructor(public dialogRef: MatDialogRef<NewAddressModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { address?: Address },
    private ngZone: NgZone,
    private alertService: AlertService
  ) {
    this.mapsKey = environment.maps_api

    if (data.address) {
      this.address = data.address;
    }
  }

  confirm(): void {
    //Set the prettu address has the name

    if (this.addressString) this.address.name = this.addressString;

    this.dialogRef.close({
      status: 'success',
      address: this.address,
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }


  loadScript(url: string): Promise<void> {
    if (this.scriptLoaded) {
      return Promise.resolve(); // Script is already loaded, resolve immediately
    }

    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.id = 'google-script';
      script.onload = () => {
        this.scriptLoaded = true; // Mark the script as loaded
        resolve();
      };
      script.onerror = (error) => reject(error);
      document.body.appendChild(script);
    });
  }


  ngOnInit(): void {

    const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${this.mapsKey}&libraries=places`;
    this.loadScript(scriptUrl)
      .then(() => {
        this.loadMap();
      })
      .catch(error => {
        console.error('Error loading Google Maps script:', error);
        this.alertService.newError('general-error')
      });

  }

  loadMap(): void {
    const mapOptions = {
      center: new google.maps.LatLng(0, 0),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    if (this.mapContainer) {
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    }
  }

  geocodeAddress(): void {
    this.geocoder = new google.maps.Geocoder();
    if (this.address.name) {
      this.geocoder.geocode({ address: this.address.name }, (results: any, status: any) => {
        if (status === 'OK' && results[0]) {
          this.ngZone.run(() => {
            const location = results[0].geometry.location;
            const mapOptions = {
              center: location,
              zoom: 15, // Set the desired zoom level here
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            if (this.mapContainer) this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);


            const marker = new google.maps.Marker({
              map: this.map,
              position: results[0].geometry.location,
              zoom: 20,
              draggable: true
            });

            //Get the current address
            const newPosition = marker.getPosition();
            this.updateAddressAndLocation(newPosition);

            marker.addListener('dragend', () => {
              const newPosition = marker.getPosition(); // Get the new position
              this.updateAddressAndLocation(newPosition);
            });
          });
        } else {
          console.error('Geocode was not successful for the following reason: ' + status);

        }
      });
    }
  }

  updateAddressAndLocation(newPosition: google.maps.LatLng): void {
    this.geocoder.geocode({ location: newPosition }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {

        this.ngZone.run(() => {
          this.addressString = results[0].formatted_address;

        });
      } else {
        console.error('Reverse geocode was not successful for the following reason: ' + status);
      }
    });
  }

}
