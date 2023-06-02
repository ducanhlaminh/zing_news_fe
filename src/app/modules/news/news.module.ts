import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { NewsRoutingModule } from './news-routing.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselComponent } from './components/home-page/carousel/carousel.component';
import { HotArticlesCateComponent } from './components/category-page/hot-articles-cate/hot-articles-cate.component';
import { BoxesHotArticelsSubCateComponent } from './components/category-page/boxes-hot-articels-sub-cate/boxes-hot-articels-sub-cate.component';
import { HomeContentComponent } from './components/contents/home-content/home-content.component';
import { CategoryContentComponent } from './components/contents/category-content/category-content.component';
@NgModule({
  declarations: [
    CarouselComponent,
    HotArticlesCateComponent,
    BoxesHotArticelsSubCateComponent,
    HomeContentComponent,
    CategoryContentComponent,
  ],
  imports: [CommonModule, NewsRoutingModule, LayoutModule, SlickCarouselModule],
})
export class NewsModule {}
