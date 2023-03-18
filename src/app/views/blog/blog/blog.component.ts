import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { debounceTime, Subscription } from "rxjs";

import { MatSnackBar } from "@angular/material/snack-bar";

import { ArticleService } from "../../../shared/services/article.service";
import { DefaultResponseType } from "../../../../types/default-response.type";
import { ArticlesType } from "../../../../types/articles.type";
import { SnackbarErrorUtil } from "../../../shared/utils/snackbar-error.util";
import { CategoriesType } from "../../../../types/categories.type";
import { CategoryService } from "../../../shared/services/category.service";
import { AppliedFilterType } from "../../../../types/applied-filter.type";
import { ActiveParamsType } from "../../../../types/active-params.type";
import { ActiveParamsUtil } from "../../../shared/utils/active-params.util";

@Component( {
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
} )
export class BlogComponent implements OnInit, OnDestroy {
  filterSelectorOpen: boolean;
  categories: CategoriesType[] | null;
  activeParams: ActiveParamsType;
  appliedFilters: AppliedFilterType[];
  articles: ArticlesType | null;
  pages: number[];
  articleServiceGetArticlesSubscription: Subscription | null;
  categoryServiceGetCategoriesSubscription: Subscription | null;
  activatedRouteQueryParamsSubscription: Subscription | null;

  constructor(private articleService: ArticleService,
              private _snackBar: MatSnackBar,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.filterSelectorOpen = false;
    this.categories = null;
    this.articles = null;
    this.activeParams = { categories: [] };
    this.appliedFilters = [];
    this.pages = [];
    this.articleServiceGetArticlesSubscription = null;
    this.categoryServiceGetCategoriesSubscription = null;
    this.activatedRouteQueryParamsSubscription = null;
  }

  ngOnInit(): void {
    this.categoryServiceGetCategoriesSubscription = this.categoryService.getCategories()
      .subscribe( (data: DefaultResponseType | CategoriesType[]) => {
        SnackbarErrorUtil.showErrorMessageIfErrorAndThrowError( data as DefaultResponseType, this._snackBar );

        this.categories = data as CategoriesType[];

        this.activatedRouteQueryParamsSubscription = this.activatedRoute.queryParams
          .pipe(
            debounceTime( 500 )
          )
          .subscribe( (params: Params) => {
            this.activeParams = ActiveParamsUtil.processParams( params );
            this.appliedFilters = [];

            this.activeParams.categories.forEach( (url: string) => {
              if (this.categories?.length) {
                const foundCategory = this.categories.find( (category: CategoriesType) => category.url === url );

                if (foundCategory) {
                  this.appliedFilters.push( {
                    name: foundCategory.name,
                    url: foundCategory.url
                  } );
                }
              }
            } );

            this.articleServiceGetArticlesSubscription = this.articleService.getArticles( this.activeParams )
              .subscribe( (data: DefaultResponseType | ArticlesType) => {
                SnackbarErrorUtil.showErrorMessageIfErrorAndThrowError( data as DefaultResponseType, this._snackBar );

                this.articles = data as ArticlesType;

                this.pages = [];
                for (let i = 1; i <= this.articles.pages; i++) {
                  this.pages.push( i );
                }
              } );
          } );
      } );
  }

  ngOnDestroy(): void {
    this.articleServiceGetArticlesSubscription?.unsubscribe();
    this.categoryServiceGetCategoriesSubscription?.unsubscribe();
    this.activatedRouteQueryParamsSubscription?.unsubscribe();
  }

  changeFilterList(category: CategoriesType): void {
    const foundCategory = this.appliedFilters.find( (filter: AppliedFilterType) => filter.name === category.name );

    if (foundCategory) {
      this.appliedFilters = this.appliedFilters.filter( (filter: AppliedFilterType) => filter.name != foundCategory.name );
      this.activeParams.categories = this.activeParams.categories.filter( (category: string) => category != foundCategory.url );
    }

    if (!foundCategory) {
      this.appliedFilters.push( { name: category.name, url: category.url } );
      this.activeParams.categories = [...this.activeParams.categories, category.url];
    }

    this.activeParams.page = 1;
    this.router.navigate( ['/blog'], { queryParams: this.activeParams } );
  }

  removeFromFilter(removedFilter: AppliedFilterType): void {
    this.appliedFilters = this.appliedFilters.filter( (filter: AppliedFilterType) => filter.name != removedFilter.name );
    this.activeParams.categories = this.activeParams.categories.filter( (category: string) => category != removedFilter.url );

    this.activeParams.page = 1;
    this.router.navigate( ['/blog'], { queryParams: this.activeParams } );
  }

  toggleFilterSelectorOpen(): void {
    this.filterSelectorOpen = !this.filterSelectorOpen;
  }

  openNextPage(): void {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate( ['/blog'], { queryParams: this.activeParams } );
    }
  }

  openPreviousPage(): void {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate( ['/blog'], { queryParams: this.activeParams } );
    }
  }

  openPage(page: number): void {
    this.activeParams.page = page;
    this.router.navigate( ['/blog'], { queryParams: this.activeParams } );
  }

  @HostListener( 'document:click', ['$event'] )
  click(event: Event): void {
    const target: HTMLElement = event.target as HTMLElement;

    if (this.filterSelectorOpen &&
      ( target.parentElement?.className === 'blog__head-filter-selector' ||
        target.parentElement?.className === 'blog__head-filter-selector-head' )) {
      return;
    }

    //it's for <svg>, <path>, <line>, <rect> etc.
    if (!target.parentElement?.classList.value) {
      this.filterSelectorOpen = false;
      return;
    }

    if (target.parentElement?.className === 'blog__head-filter-selector opened' ||
      target.parentElement?.className === 'blog__head-filter-selector-body' ||
      target.parentElement?.className.includes( 'blog__head-filter-selector-item' )) {
      return;
    }

    this.filterSelectorOpen = false;
  }
}
