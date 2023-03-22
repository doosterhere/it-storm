import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

import { MatDialog } from "@angular/material/dialog";

import { ArticleType } from "../../../../types/article.type";
import { CategoryName } from "../../../../types/categories.type";
import { ModalComponent } from "../modal/modal.component";
import { ModalService } from "../../services/modal.service";
import { environment } from "../../../../environments/environment";

@Component( {
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
} )
export class CardComponent {
  @Input() isServiceCard: boolean;
  @Input() article!: ArticleType;
  category = CategoryName;
  serverStaticPath = environment.serverStaticPath;

  constructor(private modalService: ModalService,
              public matDialog: MatDialog,
              public router: Router) {
    this.isServiceCard = false;
  }

  openModal(category: CategoryName): void {
    this.modalService.setIsLight( false );
    this.modalService.setCategory( category );
    this.matDialog.open( ModalComponent );
  }

  followTheLink(url: string): void {
    this.router.navigate( ['blog/' + url] );
  }
}
