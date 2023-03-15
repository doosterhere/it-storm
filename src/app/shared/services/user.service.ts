import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { DefaultResponseType } from "../../../types/default-response.type";
import { UserInfoType } from "../../../types/user-info.type";
import { environment } from "../../../environments/environment";

@Injectable( {
  providedIn: 'root'
} )
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getUserInfo(text?: string, article?: string): Observable<DefaultResponseType | UserInfoType> {
    return this.httpClient.get<DefaultResponseType | UserInfoType>( environment.api + 'users' );
  }
}
