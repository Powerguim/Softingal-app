import { Component, OnInit } from '@angular/core';
import { User } from '../core/models/user.model';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../core/services/alert.service';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {

  user: User = new User({});
  register: boolean = false;


  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }


  onSubmit(form: any): void {

    if (form?.valid) {

      if (this.register) {
        //Register
        this.authService.signUp(this.user).subscribe((res: any) => {
          this.alertService.newSuccess('Account created, please login');
          this.register = false;
        }, (err: any) => {
          this.alertService.newError(err?.error?.error || "Something went wrong!");
        })
      } else if (this.user.email && this.user.password) {
        //Login
        this.authService.login(this.user.email, this.user.password).subscribe((res: any) => {
          //Save the token
          this.authService.saveToken(res.token);

          //Redirect to user page
          this.router.navigate(['/user']);
        }, (err: any) => {
          console.log(err)
          this.alertService.newError("Bad Login!");
        })
      }

    } else {
      this.alertService.newError('Fill the required fields!');
    }

  }



}
