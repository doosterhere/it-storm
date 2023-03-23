import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Subscription } from "rxjs";

import { MatSnackBar } from "@angular/material/snack-bar";

import { environment } from "../../../../environments/environment";
import { ArticleService } from "../../../shared/services/article.service";
import { DefaultResponseType } from "../../../../types/default-response.type";
import { SnackbarErrorUtil } from "../../../shared/utils/snackbar-error.util";
import { DetailedArticleType } from "../../../../types/detailed-article.type";
import { ArticleType } from "../../../../types/article.type";
import { AuthService } from "../../../core/auth/auth.service";
import { CommentService } from "../../../shared/services/comment.service";
import { CommentsType, CommentType } from "../../../../types/comments.type";
import { ReactionResponseType, ReactionType } from "../../../../types/reaction-response.type";

@Component( {
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None
} )
export class ArticleComponent implements OnInit, OnDestroy {
  serverStaticPath = environment.serverStaticPath;
  isLogged: boolean;
  showSpinner: boolean;
  article: DetailedArticleType | null;
  relatedArticles: ArticleType[] | null;
  comments: CommentType[];
  reactionsFull: ReactionResponseType[];
  reactionsForLoadedComments: ReactionResponseType[];
  commentForm: FormGroup;
  currentOffset: number;
  allCount: number;
  currentUrl: string;
  previousUrl: string;
  reactionType = ReactionType;
  activatedRouteParamsSubscription: Subscription | null;
  articleServiceGetArticleSubscription: Subscription | null;
  articleServiceGetRelatedSubscription: Subscription | null;
  authServiceIsLogged$Subscription: Subscription | null;
  commentServicePostCommentSubscription: Subscription | null;
  commentServiceGetCommentsSubscription: Subscription | null;
  commentServiceApplyReactionSubscription: Subscription | null;
  commentServiceGetActionsForCommentSubscription: Subscription | null;
  commentServiceGetActionsForArticleCommentsSubscription: Subscription | null;

  constructor(private articleService: ArticleService,
              private _snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private fb: FormBuilder,
              private commentService: CommentService) {
    this.isLogged = this.authService.isLogged;
    this.showSpinner = false;
    this.article = null;
    this.relatedArticles = null;
    this.comments = [];
    this.reactionsFull = [];
    this.reactionsForLoadedComments = [];
    this.currentOffset = 0;
    this.allCount = 0;
    this.currentUrl = '';
    this.previousUrl = '';
    this.activatedRouteParamsSubscription = null;
    this.articleServiceGetArticleSubscription = null;
    this.articleServiceGetRelatedSubscription = null;
    this.authServiceIsLogged$Subscription = null;
    this.commentServicePostCommentSubscription = null;
    this.commentServiceGetCommentsSubscription = null;
    this.commentServiceApplyReactionSubscription = null;
    this.commentServiceGetActionsForCommentSubscription = null;
    this.commentServiceGetActionsForArticleCommentsSubscription = null;
    this.commentForm = this.fb.group( {
      comment: ['', [Validators.required]]
    } );
  }

  ngOnInit(): void {
    this.authServiceIsLogged$Subscription = this.authService.isLogged$
      .subscribe( (isLogged: boolean) => {
        this.isLogged = isLogged;
      } );

    this.activatedRouteParamsSubscription = this.activatedRoute.params
      .subscribe( (params: Params) => {
        this.currentUrl = params['url'];

        if (this.currentUrl !== this.previousUrl) {
          this.currentOffset = 0;
          this.comments = [];
          this.previousUrl = this.currentUrl;
          this.processPage( this.currentUrl );
        }
      } );
  }

  ngOnDestroy(): void {
    this.activatedRouteParamsSubscription?.unsubscribe();
    this.articleServiceGetArticleSubscription?.unsubscribe();
    this.articleServiceGetRelatedSubscription?.unsubscribe();
    this.authServiceIsLogged$Subscription?.unsubscribe();
    this.commentServicePostCommentSubscription?.unsubscribe();
    this.commentServiceGetCommentsSubscription?.unsubscribe();
    this.commentServiceApplyReactionSubscription?.unsubscribe();
    this.commentServiceGetActionsForCommentSubscription?.unsubscribe();
    this.commentServiceGetActionsForArticleCommentsSubscription?.unsubscribe();
  }

  processPage(url: string): void {
    this.articleServiceGetArticleSubscription = this.articleService.getArticle( url )
      .subscribe( (data: DefaultResponseType | DetailedArticleType) => {
        SnackbarErrorUtil
          .showErrorMessageIfErrorHasBeenReceivedAndThrowError( data as DefaultResponseType, this._snackBar );

        this.article = data as DetailedArticleType;
        this.getReactionsFullAndRefillReactionsForLoadedComments();

        this.articleServiceGetRelatedSubscription = this.articleService.getRelated( this.article.url )
          .subscribe( (data: DefaultResponseType | ArticleType[]) => {
            SnackbarErrorUtil
              .showErrorMessageIfErrorHasBeenReceivedAndThrowError( data as DefaultResponseType, this._snackBar );

            this.relatedArticles = data as ArticleType[];
          } );

        this.getComments( this.currentOffset );
      } );
  }

  getComments(offset: number): void {
    if (this.article) {
      this.showSpinner = true;
      this.commentServiceGetCommentsSubscription = this.commentService.getComments( offset, this.article.id )
        .subscribe( (data: DefaultResponseType | CommentsType) => {
          if (( data as DefaultResponseType ).error) {
            this._snackBar.open( 'Не удалось загрузить комментарии, попробуйте позже' );
            this.showSpinner = false;
            throw new Error( ( data as DefaultResponseType ).message );
          }

          const commentsData = data as CommentsType;
          this.allCount = commentsData.allCount;

          if (!this.currentOffset && commentsData.allCount > 3) {
            commentsData.comments.splice( 3 );
          }

          this.comments = this.comments.concat( commentsData.comments );
          this.currentOffset = this.comments.length;
          this.refillReactionsForLoadedComments();
          this.showSpinner = false;
        } );
    }
  }

  postComment(): void {
    if (this.commentForm.valid && this.article) {
      this.commentServicePostCommentSubscription =
        this.commentService.postComment( this.commentForm.value.comment, this.article.id )
          .subscribe( (data: DefaultResponseType) => {
            SnackbarErrorUtil.showErrorMessageIfErrorHasBeenReceivedAndThrowError( data, this._snackBar );

            this.commentForm.reset();
            this.comments = [];
            this.currentOffset = 0;
            this.getComments( this.currentOffset );
          } );
    }
  }

  applyReaction(id: string, reaction: ReactionType): void {
    if (this.isLogged) {
      this.commentServiceGetActionsForCommentSubscription = this.commentService.getActionsForComment( id )
        .subscribe( (data: DefaultResponseType | ReactionResponseType[]) => {
          if (( data as DefaultResponseType ).error) {
            this._snackBar.open( 'Произошла ошибка. Повторите позже' );
            throw new Error( 'Failed to get user reaction to the comment' );
          }

          const foundedComment = this.comments.find( (comment: CommentType) => comment.id === id );
          const actionsBefore = data as ReactionResponseType[];
          const reactionBefore: ReactionType | undefined =
            actionsBefore.length ? actionsBefore.find( res => res.comment === id )?.action : undefined;

          this.commentServiceApplyReactionSubscription = this.commentService.applyReaction( id, reaction )
            .subscribe( {
              next: (data: DefaultResponseType) => {
                if (data.error) {
                  this._snackBar.open( data.message );
                }

                if (reaction === ReactionType.violate) {
                  this._snackBar.open( 'Жалоба отправлена' );
                }

                if (reaction === ReactionType.like || reaction === ReactionType.dislike) {
                  this._snackBar.open( 'Ваш голос учтён' );
                }

                this.getReactionsFullAndRefillReactionsForLoadedComments();

                if (foundedComment && !actionsBefore.length && reaction === ReactionType.like) {
                  foundedComment.likesCount++;
                }

                if (foundedComment && !actionsBefore.length && reaction === ReactionType.dislike) {
                  foundedComment.dislikesCount++;
                }

                if (foundedComment && reactionBefore === ReactionType.like && reaction === ReactionType.like) {
                  foundedComment.likesCount--;
                }

                if (foundedComment && reactionBefore === ReactionType.dislike && reaction === ReactionType.dislike) {
                  foundedComment.dislikesCount--;
                }

                if (foundedComment && reactionBefore === ReactionType.dislike && reaction === ReactionType.like) {
                  foundedComment.dislikesCount--;
                  foundedComment.likesCount++;
                }

                if (foundedComment && reactionBefore === ReactionType.like && reaction === ReactionType.dislike) {
                  foundedComment.likesCount--;
                  foundedComment.dislikesCount++;
                }
              },
              error: (errorResponse: HttpErrorResponse) => {
                if (errorResponse.error && errorResponse.error.error) {
                  this._snackBar.open( errorResponse.error.message );
                } else {
                  throw new Error( errorResponse.message );
                }
              }
            } );
        } );
    }
  }

  refillReactionsForLoadedComments(): void {
    if (this.article && this.isLogged) {
      this.reactionsForLoadedComments = [];
      this.comments.forEach( (comment: CommentType) => {
        const result: ReactionResponseType | undefined =
          this.reactionsFull.find( reaction => reaction.comment === comment.id );

        if (result) {
          this.reactionsForLoadedComments.push( result );
        }

        if (!result) {
          this.reactionsForLoadedComments.push( { comment: 'fake-comment-id', action: ReactionType.violate } );
        }
      } );
    }
  }

  getReactionsFullAndRefillReactionsForLoadedComments(): void {
    if (this.article && this.isLogged) {
      this.commentServiceGetActionsForArticleCommentsSubscription =
        this.commentService.getActionsForArticleComments( this.article.id )
          .subscribe( (data: DefaultResponseType | ReactionResponseType[]) => {
            if (( data as DefaultResponseType ).error) {
              throw new Error( 'Failed to get user reactions to the article comments' );
            }

            this.reactionsFull = data as ReactionResponseType[];
            this.refillReactionsForLoadedComments();
          } );
    }
  }

  followTheLink(url: string): void {
    this.router.navigate( [url] );
  }
}
