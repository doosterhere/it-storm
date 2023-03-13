import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, throwError } from "rxjs";

import { DefaultResponseType } from "../../../types/default-response.type";
import { LoginResponseType } from "../../../types/login-response.type";
import { environment } from "../../../environments/environment";

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {
  accessTokenKey = 'accessToken';
  refreshTokenKey = 'refreshToken';
  userIdKey = 'userId';
  private _isLogged: boolean;
  isLogged$: Subject<boolean>;

  constructor(private httpClient: HttpClient) {
    this._isLogged = !!localStorage.getItem( this.accessTokenKey );
    this.isLogged$ = new Subject<boolean>();
  }

  get isLogged() {
    return this._isLogged;
  }

  set isLogged(value) {
    this._isLogged = value;
    this.isLogged$.next( this._isLogged );
  }

  getUserId(): string | null {
    return localStorage.getItem( this.userIdKey );
  }

  setUserId(value: string | null) {
    if (value) {
      localStorage.setItem( this.userIdKey, value );
      return;
    }

    if (!value) {
      localStorage.removeItem( this.userIdKey );
    }
  }

  getTokens(): { accessToken: string | null, refreshToken: string | null } {
    return {
      accessToken: localStorage.getItem( this.accessTokenKey ),
      refreshToken: localStorage.getItem( this.refreshTokenKey )
    }
  }

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem( this.accessTokenKey, accessToken );
    localStorage.setItem( this.refreshTokenKey, refreshToken );
    this.isLogged = true;
  }

  removeTokens(): void {
    localStorage.removeItem( this.accessTokenKey );
    localStorage.removeItem( this.refreshTokenKey );
    this.isLogged = false;
  }

  login(email: string, password: string, rememberMe: boolean): Observable<DefaultResponseType | LoginResponseType> {
    return this.httpClient.post<DefaultResponseType | LoginResponseType>( environment.api + 'login', {
      email,
      password,
      rememberMe
    } );
  }

  signup(name: string, email: string, password: string): Observable<DefaultResponseType | LoginResponseType> {
    return this.httpClient.post<DefaultResponseType | LoginResponseType>( environment.api + 'signup', {
      name,
      email,
      password
    } );
  }

  logout(): Observable<DefaultResponseType> {
    const refreshToken: string | null = this.getTokens().refreshToken;

    if (refreshToken) {
      return this.httpClient.post<DefaultResponseType>( environment.api + 'logout', { refreshToken } );
    }

    throw throwError( () => 'refreshToken not found' );
  }

  refresh(): Observable<DefaultResponseType | LoginResponseType> {
    const refreshToken: string | null = this.getTokens().refreshToken;

    if (refreshToken) {
      return this.httpClient.post<DefaultResponseType | LoginResponseType>( environment.api + 'refresh', { refreshToken } );
    }

    throw throwError( () => 'incorrect refreshToken' );
  }
}
