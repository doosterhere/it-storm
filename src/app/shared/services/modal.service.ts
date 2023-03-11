import { Injectable } from '@angular/core';

import { CategoriesType, CategoryName } from "../../../types/categories.type";

@Injectable( {
  providedIn: 'root'
} )
export class ModalService {
  private isLight: boolean;
  private category: CategoryName;
  private categoriesList: CategoriesType[];

  constructor() {
    this.isLight = true;
    this.category = CategoryName.copyrighting;
    this.categoriesList = [];
  }

  getIsLight(): boolean {
    return this.isLight;
  }

  setIsLight(value: boolean): void {
    this.isLight = value;
  }

  getCategory(): CategoryName {
    return this.category;
  }

  setCategory(value: CategoryName): void {
    this.category = value;
  }

  getCategoriesList(): CategoriesType[] {
    return this.categoriesList;
  }

  setCategoriesList(list: CategoriesType[]): void {
    this.categoriesList = list;
  }
}
