import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  baseUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    this.baseUrl = environment.base_url;
  }

  signUp(user: User): any {
    const body = { ...user }
    return this.http.post<any>(`${this.baseUrl}/Auth/register`, body).pipe(
      res => {
        return res;
      }
    )
  }

  login(email: string, password: string): any {
    const body = { email, password }
    return this.http.post<any>(`${this.baseUrl}/Auth/login`, body).pipe(
      res => {
        return res;
      }
    )
  }

  saveToken(token: string): void {
    //Save the jwtToken
    localStorage.setItem('userToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('userToken');
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/authentication']);

  }

  checkToken(token: string): any {
    return this.http.get<any>(`${this.baseUrl}/Auth/validateToken`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
  }

  isLoggedIn(): Promise<boolean> {
    const token: any = this.getToken();

    return new Promise<boolean>((resolve) => {
      this.checkToken(token).subscribe(
        (res: any) => {
          resolve(true);
        },
        (err: any) => {
          resolve(false);
        }
      );
    });
  }

}
