import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Subscription } from "rxjs";

import { MatSnackBar } from "@angular/material/snack-bar";

import { AuthService } from "../../../core/auth/auth.service";
import { DefaultResponseType } from "../../../../types/default-response.type";
import { LoginResponseType } from "../../../../types/login-response.type";
import { SnackbarErrorUtil } from "../../../shared/utils/snackbar-error.util";

@Component( {
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
} )
export class SignupComponent implements OnDestroy {
  passwordIsVisible: boolean;
  confirmPasswordIsVisible: boolean;
  timeout: number | null;
  readonly nameValidatorPattern = /^([А-Я][а-яё]{1,23})(\s[А-Я][а-яё]{0,23})*$/;
  readonly emailValidatorPattern = /^[^$!#^\-_*'%?]*[a-z0-9\-_.]{1,64}@[a-z0-9.-]{1,253}\.[a-z]{2,}$/i;
  readonly passwordValidatorPattern = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  authForm: FormGroup;
  authServiceSignupSubscription: Subscription | null;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router) {
    this.passwordIsVisible = false;
    this.confirmPasswordIsVisible = false;
    this.timeout = null;
    this.authServiceSignupSubscription = null;
    this.authForm = this.fb.group( {
      name: ['', [Validators.required, Validators.pattern( this.nameValidatorPattern )]],
      email: ['', [Validators.required, Validators.pattern( this.emailValidatorPattern )]],
      password: ['', [Validators.required, Validators.pattern( this.passwordValidatorPattern )]],
      confirmPassword: ['', [Validators.required]],
      checkbox: [false, [Validators.requiredTrue]]
    } );
  }

  ngOnDestroy(): void {
    this.authServiceSignupSubscription?.unsubscribe();
    if (this.timeout) {
      window.clearTimeout( this.timeout );
    }
  }

  signup(): void {
    if (this.authForm.valid && this.authForm.value.name && this.authForm.value.email && this.authForm.value.password &&
      this.authForm.value.confirmPassword && this.authForm.value.checkbox) {
      this.authServiceSignupSubscription =
        this.authService.signup( this.authForm.value.name, this.authForm.value.email, this.authForm.value.password )
          .subscribe( {
            next: (data: DefaultResponseType | LoginResponseType) => {
              SnackbarErrorUtil
                .showErrorMessageIfErrorHasBeenReceivedAndThrowError( data as DefaultResponseType, this._snackBar );

              const signupResponse = data as LoginResponseType;

              if (!signupResponse.accessToken || !signupResponse.refreshToken || !signupResponse.userId) {
                this._snackBar.open( 'Ошибка регистрации' );
                throw new Error( 'Ошибка регистрации' );
              }

              this._snackBar.open( 'Регистрация выполнена' );
              this.router.navigate( ['/login'] );
            },
            error: (errorResponse: HttpErrorResponse) => {
              if (errorResponse.error && errorResponse.error.error) {
                this._snackBar.open( errorResponse.error.message );
              } else {
                this._snackBar.open( 'Ошибка регистрации' );
              }
            }
          } );
    }
  }

  changePasswordVisibility(): void {
    this.passwordIsVisible = !this.passwordIsVisible;
  }

  changeConfirmPasswordVisibility(): void {
    this.confirmPasswordIsVisible = !this.confirmPasswordIsVisible;
  }

  followTheLink(url: string, id?: string): void {
    this.router.navigate( [url] ).then( () => {
      if (id) {
        this.timeout = window.setTimeout( () => {
          const element = document.getElementById( id );
          element?.scrollIntoView( { behavior: 'smooth' } );
        }, 100 );
      }
    } );
  }
}
