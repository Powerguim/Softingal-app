import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token: string | null;

    token = this.authService.getToken();

    // Clone the request and add the token to the headers
    const authenticatedRequest = request.clone({
      setHeaders: {
        "Authorization": `Bearer ${token}`,
      }
    });

    // Pass the authenticated request to the next interceptor or the HTTP handler
    return next.handle(authenticatedRequest);
  }
}
