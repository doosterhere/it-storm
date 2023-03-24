import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { OwlOptions } from "ngx-owl-carousel-o";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";

import { Config } from "../../shared/config/config";
import { ArticleType } from "../../../types/article.type";
import { ArticleService } from "../../shared/services/article.service";
import { DefaultResponseType } from "../../../types/default-response.type";
import { SnackbarErrorUtil } from "../../shared/utils/snackbar-error.util";
import { ModalComponent } from "../../shared/components/modal/modal.component";
import { ModalService } from "../../shared/services/modal.service";
import { CategoryName } from "../../../types/categories.type";
import { HttpErrorResponse } from "@angular/common/http";

@Component( {
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
} )
export class MainComponent implements OnInit, OnDestroy {
  bannerCarouselOptions: OwlOptions = Config.bannersCarouselOptions;
  feedbacksCarouselOptions: OwlOptions = Config.feedbacksCarouselOptions;
  bannerSlidesContent = Config.bannersCarouselSlidesContent;
  feedbacksSlidesContent = Config.feedbacksCarouselSlidesContent;
  servicesContent = Config.servicesCardsContent as ArticleType[];
  category = CategoryName;
  articles: ArticleType[];
  articleServiceSubscription: Subscription | null;

  constructor(private articleService: ArticleService,
              private _snackBar: MatSnackBar,
              private modalService: ModalService,
              private matDialog: MatDialog,
              private router: Router) {
    this.articles = [];
    this.articleServiceSubscription = null;
  }

  ngOnInit(): void {
    this.articleServiceSubscription = this.articleService.getPopular()
      .subscribe( {
        next: (data: DefaultResponseType | ArticleType[]) => {
          SnackbarErrorUtil
            .showErrorMessageIfErrorHasBeenReceivedAndThrowError( data as DefaultResponseType, this._snackBar );

          this.articles = data as ArticleType[];
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.error) {
            this._snackBar.open( errorResponse.error.message );
          } else {
            throw new Error( errorResponse.message );
          }
        }
      } );
  }

  ngOnDestroy(): void {
    this.articleServiceSubscription?.unsubscribe();
  }

  openModal(category: CategoryName): void {
    this.modalService.setIsLight( false );
    this.modalService.setCategory( category );
    this.matDialog.open( ModalComponent );
  }

  followTheLink(url: string): void {
    this.router.navigate( [url] );
  }
}
