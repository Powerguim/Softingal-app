import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  baseUrl: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.baseUrl = environment.base_url;
  }

  getAddresss() {
    const url = `${this.baseUrl}/Adresses`;

    return this.http.get<any[]>(url);
  }

  createAddress(address: Address) {
    const url = `${this.baseUrl}/Adresses`;

    return this.http.post<any[]>(url, { ...address });
  }

  updateAddress(address: Address) {
    const url = `${this.baseUrl}/Adresses`;

    return this.http.put<any[]>(url, { ...address });
  }


  deleteAddress(id: number) {
    const url = `${this.baseUrl}/Adresses/${id}`;
    return this.http.delete<any[]>(url);
  }

}
