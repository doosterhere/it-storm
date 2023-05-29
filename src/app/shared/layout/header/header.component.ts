import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
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
  timeout: number | null;
  authServiceIsLogged$Subscription: Subscription | null;
  authServiceLogoutSubscription: Subscription | null;
  userServiceGetUserInfoSubscription: Subscription | null;
  id: string | null;
  mobileMenuVisibility: boolean;
  screenWidth: number;

  constructor(private router: Router,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private userService: UserService) {
    this.isLogged = this.authService.isLogged;
    this.userName = '';
    this.timeout = null;
    this.id = null;
    this.mobileMenuVisibility = false;
    this.screenWidth = 0;
    this.authServiceIsLogged$Subscription = null;
    this.authServiceLogoutSubscription = null;
    this.userServiceGetUserInfoSubscription = null;
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

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
    if (this.timeout) {
      window.clearTimeout( this.timeout );
    }
  }

  getUserInfo(): void {
    if (this.isLogged) {
      this.userServiceGetUserInfoSubscription = this.userService.getUserInfo()
        .subscribe( {
          next: (data: DefaultResponseType | UserInfoType) => {
            if (( data as DefaultResponseType ).error) {
              this.userName = 'друг';
              throw new Error( 'couldn\'t get the username (не удалось получить имя пользователя)' );
            }

            this.userName = ( data as UserInfoType ).name.split( ' ' )[0];
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

  menuClick(): void {
    if (this.screenWidth <= 767) {
      this.changeMobileMenuVisibility();
    }

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

  followTheLink(url: string, id?: string): void {
    if (this.mobileMenuVisibility) {
      this.changeMobileMenuVisibility();
    }

    this.router.navigate( [url] ).then( () => {
      if (id) {
        this.timeout = window.setTimeout( () => {
          const element: HTMLElement | null = document.getElementById( id );
          element?.scrollIntoView( { behavior: 'smooth' } );
        }, 250 );
      }
    } );
  }

  changeMobileMenuVisibility(): void {
    this.mobileMenuVisibility = !this.mobileMenuVisibility;

    if (this.mobileMenuVisibility) {
      this.disableScroll();
      return;
    }

    this.enableScroll();
  }

  disableScroll(): void {
    const scrollTop: number = document.documentElement.scrollTop;
    const scrollLeft: number = document.documentElement.scrollLeft;

    window.onscroll = function (): void {
      window.scrollTo( scrollLeft, scrollTop );
    }
  }

  enableScroll(): void {
    window.onscroll = function (): void {
    };
  }

  @HostListener( 'window:resize', ['$event'] )
  onWindowResize() {
    this.screenWidth = window.innerWidth;
  }
}
