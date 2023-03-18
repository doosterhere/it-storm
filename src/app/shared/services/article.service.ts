import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { DefaultResponseType } from "../../../types/default-response.type";
import { environment } from "../../../environments/environment";
import { ArticleType } from "../../../types/article.type";
import { ArticlesType } from "../../../types/articles.type";
import { DetailedArticleType } from "../../../types/detailed.article.type";
import { ActiveParamsType } from "../../../types/active-params.type";

@Injectable( {
  providedIn: 'root'
} )
export class ArticleService {

  constructor(private httpClient: HttpClient) {
  }

  getPopular(): Observable<DefaultResponseType | ArticleType[]> {
    return this.httpClient.get<DefaultResponseType | ArticleType[]>( environment.api + 'articles/top' );
  }

  getRelated(url: string): Observable<DefaultResponseType | ArticleType[]> {
    return this.httpClient.get<DefaultResponseType | ArticleType[]>( environment.api + 'articles/related/' + url );
  }

  getArticles(params: ActiveParamsType): Observable<DefaultResponseType | ArticlesType> {
    return this.httpClient.get<DefaultResponseType | ArticlesType>( environment.api + 'articles', {
      params: params
    } );
  }

  getArticle(url: string): Observable<DefaultResponseType | DetailedArticleType> {
    return this.httpClient.get<DefaultResponseType | DetailedArticleType>( environment.api + 'articles/' + url );
  }
}
