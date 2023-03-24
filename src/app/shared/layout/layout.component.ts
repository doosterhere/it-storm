import { AfterContentInit, Component } from '@angular/core';

@Component( {
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
} )
export class LayoutComponent implements AfterContentInit {
  header: HTMLElement | null;
  footer: HTMLElement | null;

  constructor() {
    this.header = null;
    this.footer = null;
  }

  ngAfterContentInit(): void {
    this.header = document.getElementById( 'header' );
    this.footer = document.getElementById( 'footer' );
  }

  scrollToTheHeader(): void {
    if (this.header) {
      this.header.scrollIntoView( { behavior: 'smooth' } );
    }
  }

  scrollToTheFooter(): void {
    if (this.footer) {
      this.footer.scrollIntoView( { behavior: 'smooth' } );
    }
  }
}
