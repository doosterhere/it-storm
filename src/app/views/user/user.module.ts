import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { UserRoutingModule } from './user-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from "../../shared/shared.module";
import { TermsComponent } from './terms/terms.component';

@NgModule( {
  declarations: [
    SignupComponent,
    LoginComponent,
    TermsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    UserRoutingModule
  ]
} )
export class UserModule {
}
