import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { MatSnackBar } from "@angular/material/snack-bar";

import { AuthService } from "../../../core/auth/auth.service";
import { UserService } from "../../services/user.service";
import { DefaultResponseType } from "../../../../types/default-response.type";
import { UserInfoType } from "../../../../types/user-info.type";

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
  userServiceGetUserInfoSubscription: Subscription | null;

  constructor(private router: Router,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private userService: UserService) {
    this.isLogged = this.authService.isLogged;
    this.userName = '';
    this.authServiceIsLogged$Subscription = null;
    this.authServiceLogoutSubscription = null;
    this.userServiceGetUserInfoSubscription = null;
  }

  ngOnInit(): void {
    this.authServiceIsLogged$Subscription = this.authService.isLogged$
      .subscribe( (isLogged: boolean) => {
        this.isLogged = isLogged;
        this.getUserInfo();
      } );

    this.getUserInfo();
  }

  ngOnDestroy(): void {
    this.authServiceIsLogged$Subscription?.unsubscribe();
    this.authServiceLogoutSubscription?.unsubscribe();
    this.userServiceGetUserInfoSubscription?.unsubscribe();
  }

  getUserInfo(): void {
    if (this.isLogged) {
      this.userServiceGetUserInfoSubscription = this.userService.getUserInfo()
        .subscribe( (data: DefaultResponseType | UserInfoType) => {
          if (( data as DefaultResponseType ).error) {
            this.userName = 'друг';
            throw new Error( 'couldn\'t get the username (не удалось получить имя пользователя)' );
          }

          this.userName = ( data as UserInfoType ).name.split( ' ' )[0];
        } );
    }
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

  followTheLink(url: string, fragment?: string): void {
    this.router.navigate( [url], { fragment: fragment } );
  }
}
