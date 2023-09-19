import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertModalComponent } from '../elements/modals/alert-modal/alert-modal.component';



@Injectable({
  providedIn: 'root'
})

export class AlertService {


  constructor(private _snackBar: MatSnackBar,
  ) {
  }


  newSuccess(message: string) {
    this._snackBar.openFromComponent(AlertModalComponent, {
      duration: 1500,
      horizontalPosition: "center",
      verticalPosition: 'top',
      panelClass: 'success-notification',
      data: { message }
    });
  }

  newError(message: string) {
    this._snackBar.openFromComponent(AlertModalComponent, {
      duration: 1500,
      horizontalPosition: "center",
      verticalPosition: 'top',
      panelClass: 'error-notification',
      data: { message }
    });
  }



}
