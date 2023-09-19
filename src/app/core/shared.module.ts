import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModalComponent } from './elements/modals/alert-modal/alert-modal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertService } from './services/alert.service';
import { NewAddressModalComponent } from './elements/modals/new-address-modal/new-address-modal.component';
import { AddressesTableComponent } from './elements/tables/addresses-table/addresses-table.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { DebounceDirective } from './directives/debounce.directive';



@NgModule({
    declarations: [
        AlertModalComponent,
        NewAddressModalComponent,
        AddressesTableComponent,
        DebounceDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        GoogleMapsModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        NewAddressModalComponent,
        AddressesTableComponent, 
        GoogleMapsModule,
    ],
    providers: [AlertService]
})
export class SharedModule { }
