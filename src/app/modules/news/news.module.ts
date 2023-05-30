import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { NewsRoutingModule } from './news-routing.module';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselComponent } from './components/carousel/carousel.component';
import { DetailComponent } from './pages/detail/detail.component';
import { HotArticlesCateComponent } from './components/category-page/hot-articles-cate/hot-articles-cate.component';
import { BoxesHotArticelsSubCateComponent } from './components/category-page/boxes-hot-articels-sub-cate/boxes-hot-articels-sub-cate.component';
@NgModule({
  declarations: [
    CategoryComponent,
    HomeComponent,
    CarouselComponent,
    DetailComponent,
    HotArticlesCateComponent,
    BoxesHotArticelsSubCateComponent,
  ],
  imports: [CommonModule, NewsRoutingModule, LayoutModule, SlickCarouselModule],
})
export class NewsModule {}
