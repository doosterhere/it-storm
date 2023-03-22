import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { MatDialog } from "@angular/material/dialog";

import { ModalComponent } from "../../components/modal/modal.component";
import { ModalService } from "../../services/modal.service";

@Component( {
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
} )
export class FooterComponent {

  constructor(public matDialog: MatDialog,
              private modalService: ModalService,
              private router: Router) {
  }

  openModal(): void {
    this.modalService.setIsLight( true );
    this.matDialog.open( ModalComponent );
  }

  followTheLink(url: string, fragment?: string): void {
    this.router.navigate( [url], { fragment: fragment } );
  }
}
