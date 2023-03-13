import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { MatSnackBar } from "@angular/material/snack-bar";

import { AuthService } from "../../../core/auth/auth.service";

@Component( {
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
} )
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged: boolean;
  userName: string;
  authServiceIsLogged$Subscription: Subscription | null;
  authServiceLogoutSubscription: Subscription | null;

  constructor(private router: Router,
              private authService: AuthService,
              private _snackBar: MatSnackBar) {
    this.isLogged = this.authService.isLogged;
    this.userName = '';
    this.authServiceIsLogged$Subscription = null;
    this.authServiceLogoutSubscription = null;
  }

  ngOnInit(): void {
    this.authServiceIsLogged$Subscription = this.authService.isLogged$
      .subscribe( (isLogged: boolean) => {
        this.isLogged = isLogged;
      } );
  }

  ngOnDestroy(): void {
    this.authServiceIsLogged$Subscription?.unsubscribe();
    this.authServiceLogoutSubscription?.unsubscribe();
  }

  menuClick(): void {
    if (this.isLogged) {
      this.authServiceLogoutSubscription = this.authService.logout()
        .subscribe( {
          next: () => {
            this.doLogoutAction();
          },
          error: () => {
            this.doLogoutAction();
          }
        } );
      return;
    }

    this.router.navigate( ['login'] );
  }

  doLogoutAction(): void {
    this.authService.removeTokens();
    this.authService.setUserId( null );
    this._snackBar.open( 'Вы вышли из системы' );
  }
}
