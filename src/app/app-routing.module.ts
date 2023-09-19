import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticationComponent } from './authentication/authentication.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: "user",
    component: UserComponent,
     canActivate: [AuthGuard] //Need to be logged in
  },
  {
    path: "authentication",
    component: AuthenticationComponent
  },
  {
    path: "", redirectTo: "authentication", pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
