import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { NewsRoutingModule } from './news-routing.module';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselComponent } from './components/carousel/carousel.component';
import { DetailComponent } from './pages/detail/detail.component';
@NgModule({
  declarations: [CategoryComponent, HomeComponent, CarouselComponent, DetailComponent],
  imports: [CommonModule, NewsRoutingModule, LayoutModule, SlickCarouselModule],
})
export class NewsModule {}
