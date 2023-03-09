import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";
import { DefaultResponseType } from "../../../types/default-response.type";
import { RequestRequestType } from "../../../types/request-request.type";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private httpClient: HttpClient) {
  }

  sendRequest(data: RequestRequestType): Observable<DefaultResponseType> {
    return this.httpClient.post<DefaultResponseType>(environment.api + 'requests', data);
  }
}
