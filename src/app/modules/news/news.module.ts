import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { NewsRoutingModule } from './news-routing.module';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';
@NgModule({
  declarations: [CategoryComponent, HomeComponent],
  imports: [CommonModule, NewsRoutingModule, LayoutModule],
})
export class NewsModule {}
