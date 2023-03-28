import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";

import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';
import { ConfirmPasswordDirective } from './directives/confirm-password.directive';
import { CardComponent } from './components/card/card.component';

@NgModule( {
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    ConfirmPasswordDirective,
    CardComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    RouterOutlet,
    ReactiveFormsModule,
    MatSelectModule,
    NgxMaskDirective
  ],
  exports: [
    ModalComponent,
    ConfirmPasswordDirective,
    CardComponent
  ],
  providers: [
    provideNgxMask()
  ]
} )
export class SharedModule {
}
