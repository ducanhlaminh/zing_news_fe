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
      hotArticles: any;
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

                  this.getCateogory(this.slug_crc);
            });
            this.navigationSubscription = this.Router.events.subscribe(
                  (e: any) => {
                        // If it is a NavigationEnd event re-initalise the component
                        if (e instanceof NavigationEnd) {
                              this.page = 1;
                              this.hotArticles = {
                                    left: null,
                                    right: [],
                                    bottom: [],
                              };
                              this.getArticles(this.slug_crc);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                  }
            );
            this.CategoryService.categories$.subscribe((data) => {
                  this.categories = data;
                  this.getCateogory(this.slug_crc);
            });
            this.getArticles(this.slug_crc);
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
                        if (data.boxSubCate.length === 0) {
                              this.isCateChid = true;
                              const result1 = Array(3)
                                    .fill(null)
                                    .map((_, index) => {
                                          const post =
                                                data.hotArticlesCate.new_articles_hot_categories.find(
                                                      (item: any) =>
                                                            item.position ===
                                                            index + 1
                                                );
                                          return post
                                                ? post
                                                : {
                                                        position: index + 1,
                                                        new_article: null,
                                                  };
                                    });

                              this.hotArticles = {
                                    left: result1[0],
                                    right: [result1[1], result1[2]],
                              };
                        } else {
                              this.isCateChid = false;
                              const result = Array(9)
                                    .fill(null)
                                    .map((_, index) => {
                                          const post =
                                                data.hotArticlesCate.new_articles_hot_categories.find(
                                                      (item: any) =>
                                                            item.position ===
                                                            index + 1
                                                );
                                          return post
                                                ? post
                                                : {
                                                        position: index + 1,
                                                        new_article: null,
                                                  };
                                    });

                              this.hotArticles = {
                                    left: result[0],
                                    right: [
                                          result[1],
                                          result[2],
                                          result[3],
                                          result[4],
                                    ],
                                    bottom: [
                                          result[5],
                                          result[6],
                                          result[7],
                                          result[8],
                                    ],
                              };
                        }

                        console.log(this.hotArticles);

                        // data.hotArticlesCate.new_articles_hot_categories?.map(
                        //       (article: any) => {
                        //             if (article.position === 1) {
                        //                   this.hotArticles.left = article;
                        //             } else if (
                        //                   article.position > 1 &&
                        //                   article.position < 6
                        //             ) {
                        //                   this.hotArticles.right.push(article);
                        //             } else {
                        //                   this.hotArticles.bottom.push(article);
                        //             }
                        //       }
                        // );
                        // console.log(this.hotArticles);
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
            this.categories?.map((category: any) => {
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
