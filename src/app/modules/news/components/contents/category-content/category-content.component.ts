import { Component, Renderer2 } from '@angular/core';
import {
      ActivatedRoute,
      NavigationEnd,
      NavigationStart,
      Router,
} from '@angular/router';
import { NewsService } from '../../../services/news.service';
import { CategoryService } from '../../../services/category.service';

@Component({
      selector: 'app-category-content',
      templateUrl: './category-content.component.html',
      styleUrls: ['./category-content.component.scss'],
})
export class CategoryContentComponent {
      CategoryCurrent: any;
      subCategory: any[] = [];
      navigationSubscription: any;
      hotArticles: any = { left: null, right: [], bottom: [] };
      newArticles: any[] = [];
      hotArticlesSubCate: any[] = [];
      isCateChid: boolean = false;
      articlesViews: any[] = [];
      page = 1;
      slug_crc: any;
      categories: any;
      constructor(
            public CategoryService: CategoryService,
            private ActivatedRoute: ActivatedRoute,
            private Router: Router,
            private NewsService: NewsService,
            public renderer: Renderer2
      ) {}
      ngOnInit(): void {
            this.page = 1;
            window.scrollTo({ top: 0, behavior: 'smooth' });

            this.ActivatedRoute.params.subscribe((params: any) => {
                  this.slug_crc = params['slug_crc'];
                  this.getArticles(this.slug_crc);
                  this.getCateogory(this.slug_crc);
            });
            this.navigationSubscription = this.Router.events.subscribe(
                  (e: any) => {
                        // If it is a NavigationEnd event re-initalise the component
                        if (e instanceof NavigationStart) {
                              this.page = 1;
                              this.hotArticles = {
                                    left: null,
                                    right: [],
                                    bottom: [],
                              };
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                  }
            );
            this.CategoryService.categories$.subscribe((data) => {
                  this.categories = data;
                  this.getCateogory(this.slug_crc);
            });
      }
      ngOnDestroy() {
            if (this.navigationSubscription) {
                  this.navigationSubscription.unsubscribe();
            }
      }
      getArticles(slug_crc: string) {
            // Get hot articles
            this.NewsService.getartclesHotCate(slug_crc).subscribe(
                  (data: any) => {
                        data.hotArticlesCate.new_articles_hot_categories?.map(
                              (article: any) => {
                                    if (article.position === 1) {
                                          this.hotArticles.left = article;
                                    } else if (
                                          article.position > 1 &&
                                          article.position < 6
                                    ) {
                                          this.hotArticles.right.push(article);
                                    } else {
                                          this.hotArticles.bottom.push(article);
                                    }
                              }
                        );
                        console.log(this.hotArticles);

                        if (data.boxSubCate.length === 0) {
                              this.isCateChid = true;
                        } else {
                              this.isCateChid = false;
                        }
                  }
            );
            this.NewsService.getBoxArticlesCategory(slug_crc).subscribe(
                  (data: any) => {
                        this.hotArticlesSubCate = data.box;
                  }
            );
            //get new articles
            this.NewsService.getNewArtclesCate(slug_crc, this.page).subscribe(
                  (data: any) => {
                        this.newArticles = data.newArticleCate;
                  }
            );

            // get articles most views
            return this.NewsService.getArticlesView(slug_crc).subscribe(
                  (data: any) => (this.articlesViews = data)
            );
      }
      getCateogory(slug_crc: string) {
            this.categories.map((category: any) => {
                  if (category.slug_crc === parseInt(slug_crc)) {
                        return (this.CategoryCurrent = category);
                  } else {
                        category.childCategories.map((child: any) => {
                              if (child.slug_crc === parseInt(slug_crc)) {
                                    return (this.CategoryCurrent = child);
                              }
                        });
                  }
            });

            // return this.CategoryService.getSubCategory(slug_crc).subscribe(
            //       (data: any) => {
            //             this.CategoryCurrent = data;
            //       }
            // );
      }
      handleImageError(event: any) {
            const fallbackImage =
                  'https://nic.gov.vn/wp-content/plugins/elementor/assets/images/placeholder.png';
            this.renderer.setAttribute(event.target, 'src', fallbackImage);
      }
      onScrollDown() {
            console.log(this.newArticles);

            ++this.page;
            this.NewsService.getNewArtclesCate(
                  this.slug_crc,
                  this.page
            ).subscribe((data: any) => {
                  data.newArticleCate.map((item: any) =>
                        this.newArticles.push(item)
                  );
                  console.log(this.newArticles);
            });
      }
}
