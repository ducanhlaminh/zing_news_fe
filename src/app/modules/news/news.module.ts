import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { NewsRoutingModule } from './news-routing.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselComponent } from './components/common/carousel/carousel.component';
import { HotArticlesCateComponent } from './components/common/hot-articles-cate/hot-articles-cate.component';
import { BoxesHotArticelsSubCateComponent } from './components/common/boxes-hot-articels-sub-cate/boxes-hot-articels-sub-cate.component';
import { HomeContentComponent } from './components/contents/home-content/home-content.component';
import { CategoryContentComponent } from './components/contents/category-content/category-content.component';
import { SearchContentComponent } from './components/contents/search-content/search-content.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    CarouselComponent,
    HotArticlesCateComponent,
    BoxesHotArticelsSubCateComponent,
    HomeContentComponent,
    CategoryContentComponent,
    SearchContentComponent,
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    LayoutModule,
    SlickCarouselModule,
    FontAwesomeModule,
  ],
})
export class NewsModule {}
