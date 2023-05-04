import { Component, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

import { MatDialog } from "@angular/material/dialog";

import { ModalComponent } from "../../components/modal/modal.component";
import { ModalService } from "../../services/modal.service";

@Component( {
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
} )
export class FooterComponent implements OnDestroy {
  timeout: number | null;

  constructor(public matDialog: MatDialog,
              private modalService: ModalService,
              private router: Router) {
    this.timeout = null;
  }

  ngOnDestroy(): void {
    if (this.timeout) {
      window.clearTimeout( this.timeout );
    }
  }

  openModal(): void {
    this.modalService.setIsLight( true );
    this.matDialog.open( ModalComponent );
  }

  followTheLink(url: string, id?: string): void {
    this.router.navigate( [url] ).then( () => {
      if (id) {
        this.timeout = window.setTimeout( () => {
          const element: HTMLElement | null = document.getElementById( id );
          element?.scrollIntoView( { behavior: 'smooth' } );
        }, 200 );
      }
    } );
  }
}
