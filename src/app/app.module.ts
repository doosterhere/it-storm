import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from "@angular/material/snack-bar";
import { MAT_MENU_DEFAULT_OPTIONS } from "@angular/material/menu";
import { CarouselModule } from "ngx-owl-carousel-o";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { MainComponent } from './views/main/main.component';
import { AuthInterceptor } from "./core/auth/auth.interceptor";
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

@NgModule( {
  declarations: [
    AppComponent,
    MainComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule,
    MatSnackBarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    AppRoutingModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    { provide: MAT_MENU_DEFAULT_OPTIONS, useValue: { overlayPanelClass: 'mat-menu-overlay-with-margin-top' } },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
} )
export class AppModule {
}
