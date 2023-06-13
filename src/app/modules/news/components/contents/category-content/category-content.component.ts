import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
  hotArticles: any[] = [];
  newArticles: any[] = [];
  hotArticlesSubCate: any[] = [];
  isCateChid: boolean = false;
  articlesViews: any[] = [];
  constructor(
    public CategoryService: CategoryService,
    private ActivatedRoute: ActivatedRoute,
    private Router: Router,
    private NewsService: NewsService
  ) {}
  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((params: any) => {
      const slug_crc = params['slug_crc'];
      this.getArticles(slug_crc);
      this.getCateogory(slug_crc);
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
  getArticles(slug_crc: string) {
    // Get hot articles
    this.NewsService.getartclesHotCate(slug_crc).subscribe((data: any) => {
      this.hotArticles = data.hotArticlesCate.new_articles_hot_categories;
      this.hotArticlesSubCate = data.boxSubCate;
      if (data.boxSubCate.length === 0) {
        this.isCateChid = true;
      } else {
        this.isCateChid = false;
      }
    });
    //get new articles
    this.NewsService.getNewArtclesCate(slug_crc).subscribe((data: any) => {
      this.newArticles = data.newArticleCate;
    });

    // get articles most views
    return this.NewsService.getArticlesView(slug_crc).subscribe(
      (data: any) => (this.articlesViews = data)
    );
  }
  getCateogory(slug_crc: string) {
    return this.CategoryService.getSubCategory(slug_crc).subscribe(
      (data: any) => {
        this.CategoryCurrent = data;
      }
    );
  }
}
