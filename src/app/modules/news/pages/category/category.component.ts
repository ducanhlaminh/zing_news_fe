import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NewsService } from '../../services/news.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  CategoryCurrent: any;
  subCategory: any[] = [];
  navigationSubscription: any;
  hotArticles: any[] = [];
  newArticles: any[] = [];
  hotArticlesSubCate: any[] = [];
  isCateChid: boolean = false;
  constructor(
    public CategoryService: CategoryService,
    private ActivatedRoute: ActivatedRoute,
    private Router: Router,
    private NewsService: NewsService
  ) {}
  ngOnInit(): void {
    console.log(this.CategoryService.categories);

    this.ActivatedRoute.params.subscribe((params: any) => {
      const slug_crc = params['slug_crc'];
      this.getCategoriesCurrent(slug_crc);
      this.getNewArticlesCate(slug_crc);
      this.getHotArticlesCate(slug_crc);
    });

    this.navigationSubscription = this.Router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        // this.getHotArticlesCate(slug_crc);
      }
    });
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  getCategoriesCurrent(slug_crc: any): any {
    this.CategoryService.getSubCategory(slug_crc).subscribe(
      (data: any) => (this.CategoryCurrent = data)
    );
  }
  getHotArticlesCate(slug_crc: any) {
    this.NewsService.getartclesHotCate(slug_crc).subscribe((data: any) => {
      this.hotArticles = data.hotArticlesCate.new_articles_hot_categories;
      this.hotArticlesSubCate = data.boxSubCate;
    });
  }
  getNewArticlesCate(slug: string) {
    this.NewsService.getNewArtclesCate(slug).subscribe((data: any) => {
      this.newArticles = data.newArticleCate;
    });
  }
}
