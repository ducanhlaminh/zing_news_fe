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
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { CreatePostContentComponent } from './components/contents/admin/create-post-content/create-post-content.component';
import { DetailContentComponent } from './components/contents/detail-content/detail-content.component';
import { ArticleComponent } from './components/common/article/article.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ManageArticlesComponent } from './components/contents/admin/manage-articles/manage-articles.component';
import { DatePipe } from 'src/app/shared/pipe/date.pipe';
import { ManageCategoriesComponent } from './components/contents/admin/manage-categories/manage-categories.component';
import { CreateCategoryComponent } from './components/contents/admin/create-category/create-category.component';
@NgModule({
      declarations: [
            DatePipe,
            CarouselComponent,
            HotArticlesCateComponent,
            BoxesHotArticelsSubCateComponent,
            HomeContentComponent,
            CategoryContentComponent,
            SearchContentComponent,
            CreatePostContentComponent,
            DetailContentComponent,
            ArticleComponent,
            ManageArticlesComponent,
            ManageCategoriesComponent,
            CreateCategoryComponent,
      ],
      imports: [
            CommonModule,
            NewsRoutingModule,
            LayoutModule,
            SlickCarouselModule,
            EditorModule,
            MatFormFieldModule,
            MatInputModule,
            MatSelectModule,
      ],
      providers: [
            { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
      ],
})
export class NewsModule {}
