import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";

import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';
import { MatSelectModule } from "@angular/material/select";

@NgModule( {
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ModalComponent
  ],
    imports: [
        CommonModule,
        MatMenuModule,
        MatDialogModule,
        MatIconModule,
        RouterOutlet,
        RouterLink,
        ReactiveFormsModule,
        MatSelectModule
    ],
  exports: [
    ModalComponent
  ]
} )
export class SharedModule {
}
