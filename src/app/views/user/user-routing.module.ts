import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { TermsComponent } from "./terms/terms.component";

const routes: Routes = [
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "terms", component: TermsComponent },
];

@NgModule( {
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
} )
export class UserRoutingModule {
}
