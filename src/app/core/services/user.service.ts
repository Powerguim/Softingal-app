import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string;

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentUser$: Observable<any> = this.currentUserSubject.asObservable();


  constructor(private http: HttpClient, private authService: AuthService) {
    this.baseUrl = environment.base_url;
  }

  getUser() {
    const url = `${this.baseUrl}/perfil`;
    return this.http.get<any[]>(url);
  }

  saveUser(user: User) {
    const url = `${this.baseUrl}/perfil`;

    return this.http.put(url, { ...user });
  }

  updatePassword(oldPass: string, newPass: string) {
    const url = `${this.baseUrl}/perfil/password`;

    return this.http.put(url, { old_password: oldPass, password: newPass });
  }


  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }


}
