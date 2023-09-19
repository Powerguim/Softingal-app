import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    const isAuthenticated = await this.authService.isLoggedIn();

    console.log("isauthenerouigjps")
    console.log(isAuthenticated)
    if (isAuthenticated) {
      return true; // User is authenticated, allow access to the requested route
    } else {
      this.router.navigate(['/authentication']); // User is not authenticated, redirect to the authentication page
      return false;
    }
  }

  constructor(private router: Router, private authService: AuthService) { }
}
