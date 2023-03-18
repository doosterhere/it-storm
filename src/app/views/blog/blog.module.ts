import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog/blog.component';
import { ArticleComponent } from './article/article.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule( {
  declarations: [
    BlogComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    MatOptionModule,
    MatSelectModule,
    SharedModule,
    BlogRoutingModule
  ]
} )
export class BlogModule {
}
