import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { MatSnackBar } from "@angular/material/snack-bar";

import { AuthService } from "../../../core/auth/auth.service";
import { DefaultResponseType } from "../../../../types/default-response.type";
import { LoginResponseType } from "../../../../types/login-response.type";
import { SnackbarErrorUtil } from "../../../shared/utils/snackbar-error.util";

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
} )
export class LoginComponent implements OnDestroy {
  passwordIsVisible: boolean;
  authForm: FormGroup;
  authServiceSubscription: Subscription | null;

  constructor(private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private authService: AuthService,
              private router: Router) {
    this.passwordIsVisible = false;
    this.authServiceSubscription = null;
    this.authForm = this.fb.group( {
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      checkbox: [false]
    } );
  }

  ngOnDestroy(): void {
    this.authServiceSubscription?.unsubscribe();
  }

  login(): void {
    if (this.authForm.valid && this.authForm.value.email && this.authForm.value.password) {
      this.authServiceSubscription =
        this.authService.login( this.authForm.value.email, this.authForm.value.password, this.authForm.value.checkbox )
          .subscribe( {
            next: (data: DefaultResponseType | LoginResponseType) => {
              SnackbarErrorUtil.showErrorMessageIfErrorAndThrowError( data as DefaultResponseType, this._snackBar );

              const loginResponse = data as LoginResponseType;

              if (!loginResponse.accessToken || !loginResponse.refreshToken || !loginResponse.userId) {
                this._snackBar.open( 'Ошибка авторизации' );
                throw new Error( 'Ошибка авторизации' );
              }

              this.authService.setTokens( loginResponse.accessToken, loginResponse.refreshToken );
              this.authService.setUserId( loginResponse.userId );
              this._snackBar.open( 'Вход выполнен' );
              this.router.navigate( ['/'] );
            },
            error: (errorResponse: HttpErrorResponse) => {
              if (errorResponse.error && errorResponse.error.message) {
                this._snackBar.open( errorResponse.message );
              } else {
                this._snackBar.open( 'Ошибка авторизации' );
              }
            }
          } );
    }
  }

  changePasswordVisibility(): void {
    this.passwordIsVisible = !this.passwordIsVisible;
  }
}
