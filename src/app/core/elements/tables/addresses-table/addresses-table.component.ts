import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Address } from 'src/app/core/models/address.model';
import { AddressService } from 'src/app/core/services/address.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { NewAddressModalComponent } from '../../modals/new-address-modal/new-address-modal.component';

@Component({
  selector: 'app-addresses-table',
  templateUrl: './addresses-table.component.html',
  styleUrls: ['./addresses-table.component.css']
})
export class AddressesTableComponent implements OnInit {

  @Input() rows: Address[] = [];

  constructor(private addressService: AddressService,
    private alertService: AlertService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchAddresses();
  }

  fetchAddresses(): void {
    this.addressService.getAddresss().subscribe((res: Address[]) => {
      this.rows = res;
    }, (error: any) => this.alertService.newError('Something went wrong!'));
  }

  addAddress(): void {

    const dialogRef = this.dialog.open(NewAddressModalComponent, {
      panelClass: 'maps-modal',
      data: {},
      width: '600px'
    });


    dialogRef.afterClosed().subscribe((result: any) => {
      if (result?.status === 'success') {
        if (result.address) {
          this.addressService.createAddress(result.address).subscribe(

            (res: Address[]) => {
              this.rows = res;
            }, (error: any) => {
              this.alertService.newError('Something went wrong!');
            }
          )
        } else {
          this.alertService.newError('Address is a required field!')
        }



      }
    });


  }

  editAddress(address: Address): void {
    const dialogRef = this.dialog.open(NewAddressModalComponent, {
      panelClass: 'maps-modal',
      data: { address },
      width: '600px'
    });


    dialogRef.afterClosed().subscribe((result: any) => {
      if (result?.status === 'success') {
        if (result.address) {
          this.addressService.updateAddress(result.address).subscribe(
            (res: Address[]) => {
              this.rows = res;
            }, (error: any) => {
              this.alertService.newError('Something went wrong!');
            }
          )
        } else {
          this.alertService.newError('Address is a required field!')
        }
      }
    });
  }

  deleteAddress(id: number): void {
    if (window.confirm("Are you sure you wanna delete this address?")) {

      this.addressService.deleteAddress(id).subscribe(
        (res: any) => {
          this.fetchAddresses();
        }, (error: any) => {
          this.alertService.newError('Something went wrong!');
        }
      )
    } else {
      this.alertService.newError('Address is a required field!')
    }
  }

}
