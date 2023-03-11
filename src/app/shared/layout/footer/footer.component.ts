import { Component } from '@angular/core';

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
              private modalService: ModalService) {
  }

  openModal(): void {
    this.modalService.setIsLight( true );
    const modalDialog = this.matDialog.open( ModalComponent );
  }
}
