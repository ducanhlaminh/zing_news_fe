import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { NewsService } from '../../../services/news.service';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
@Component({
      selector: 'app-detail-content',
      templateUrl: './detail-content.component.html',
      styleUrls: ['./detail-content.component.scss'],
})
export class DetailContentComponent implements OnInit {
      content: any;
      relateArticles: any = [];
      slug_crc: any;
      page = 1;
      categories: any = [];
      faChevronRight = faChevronRight;

      @ViewChild('content') contentTag: any;
      constructor(
            private ActivatedRoute: ActivatedRoute,
            private Router: Router,
            private NewsService: NewsService,
            public renderer: Renderer2
      ) {}
      ngOnInit(): void {
            this.scrollToTop();
            this.ActivatedRoute.params.subscribe((params: any) => {
                  this.slug_crc = params['slug_crc'];
                  const slug = params['slug'];
                  this.getContentArticle(slug, this.slug_crc);
            });
            this.Router.events.subscribe((e: any) => {
                  // If it is a NavigationEnd event re-initalise the component
                  if (e instanceof NavigationStart) {
                        this.page = 1;
                        this.scrollToTop();
                  }
            });
      }
      scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      getContentArticle(slug: any, slug_crc: any) {
            this.NewsService.getDetail(slug, slug_crc).subscribe(
                  (data: any) => {
                        this.contentTag.nativeElement.innerHTML =
                              data.article.content;
                        this.categories = data.category;
                        console.log(this.categories);

                        this.getRelateArticles(
                              this.categories[this.categories.length - 1]
                                    .category.slug_crc
                        );
                  }
            );
      }
      onScrollDown() {
            if (this.page < 10) {
                  ++this.page;
                  this.getRelateArticles(
                        this.categories[this.categories.length - 1].category
                              .slug_crc
                  );
            }
      }
      getRelateArticles(slug_crc: any) {
            this.NewsService.getNewArtclesCate(slug_crc, this.page).subscribe(
                  (data: any) => {
                        this.relateArticles = [
                              ...this.relateArticles,
                              ...data.newArticleCate,
                        ];

                        // this.relateArticles = ...this.relateArticles
                  }
            );
      }
      handleImageError(event: any) {
            const fallbackImage =
                  'https://nic.gov.vn/wp-content/plugins/elementor/assets/images/placeholder.png';
            this.renderer.setAttribute(event.target, 'src', fallbackImage);
      }
}
