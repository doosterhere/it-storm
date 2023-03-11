import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { DefaultResponseType } from "../../../types/default-response.type";
import { environment } from "../../../environments/environment";
import { ArticleType } from "../../../types/article.type";

@Injectable( {
  providedIn: 'root'
} )
export class ArticleService {

  constructor(private httpClient: HttpClient) {
  }

  getPopular(): Observable<DefaultResponseType | ArticleType[]> {
    return this.httpClient.get<DefaultResponseType | ArticleType[]>( environment.api + 'articles/top' );
  }
}
