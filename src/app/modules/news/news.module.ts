import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { CategoryComponent } from './pages/category/category.component';


@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule
  ]
})
export class NewsModule { }
