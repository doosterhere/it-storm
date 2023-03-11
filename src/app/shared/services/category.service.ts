import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { DefaultResponseType } from "../../../types/default-response.type";
import { CategoriesType } from "../../../types/categories.type";
import { environment } from "../../../environments/environment";

@Injectable( {
  providedIn: 'root'
} )
export class CategoryService {

  constructor(private httpClient: HttpClient) {
  }

  getCategories(): Observable<DefaultResponseType | CategoriesType[]> {
    return this.httpClient.get<DefaultResponseType | CategoriesType[]>( environment.api + 'categories' );
  }
}
