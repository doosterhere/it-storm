import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

import { DefaultResponseType } from "../../../types/default-response.type";
import { CommentsType, CommentType } from "../../../types/comments.type";
import { environment } from "../../../environments/environment";
import { ReactionResponseType, ReactionType } from "../../../types/reaction-response.type";

@Injectable( {
  providedIn: 'root'
} )
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  getComments(offset: number, id: string): Observable<DefaultResponseType | CommentsType> {
    return this.httpClient
      .get<DefaultResponseType | CommentsType>( environment.api + 'comments?offset=' + offset + '&article=' + id )
      .pipe(
        map( (data: DefaultResponseType | CommentsType) => {
          if (( data as CommentsType ).allCount) {
            ( data as CommentsType ).comments.forEach( (comment: CommentType) => {
              comment.date = new Date( comment.date ).toLocaleString( 'ru-RU' );
            } );
          }

          return data;
        } )
      );
  }

  postComment(text: string, id: string): Observable<DefaultResponseType> {
    return this.httpClient.post<DefaultResponseType>( environment.api + 'comments', {
      text: text,
      article: id
    } );
  }

  applyReaction(id: string, reaction: ReactionType): Observable<DefaultResponseType> {
    return this.httpClient.post<DefaultResponseType>( environment.api + 'comments/' + id + '/apply-action', {
      action: reaction
    } );
  }

  getActionsForComment(id: string): Observable<DefaultResponseType | ReactionResponseType[]> {
    return this.httpClient
      .get<DefaultResponseType | ReactionResponseType[]>( environment.api + 'comments/' + id + '/actions' );
  }

  getActionsForArticleComments(id: string): Observable<DefaultResponseType | ReactionResponseType[]> {
    return this.httpClient
      .get<DefaultResponseType | ReactionResponseType[]>( environment.api + 'comments/article-comment-actions?articleId=' + id );
  }
}
