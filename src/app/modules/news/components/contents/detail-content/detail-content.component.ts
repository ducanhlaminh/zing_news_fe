import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../../services/news.service';

@Component({
      selector: 'app-detail-content',
      templateUrl: './detail-content.component.html',
      styleUrls: ['./detail-content.component.scss'],
})
export class DetailContentComponent implements OnInit {
      content: any;
      relateArticles: any;
      slug_crc: any;
      page = 1;
      @ViewChild('content') contentTag: any;
      constructor(
            private ActivatedRoute: ActivatedRoute,
            private Router: Router,
            private NewsService: NewsService
      ) {}
      ngOnInit(): void {
            this.ActivatedRoute.params.subscribe((params: any) => {
                  this.slug_crc = params['slug_crc'];
                  const slug = params['slug'];
                  this.getContentArticle(slug, this.slug_crc);
                  this.getRelateArticles(this.slug_crc);
            });
      }
      getContentArticle(slug: any, slug_crc: any) {
            this.NewsService.getDetail(slug, slug_crc).subscribe(
                  (data: any) => {
                        this.contentTag.nativeElement.innerHTML =
                              data.article.content;
                  }
            );
      }
      getRelateArticles(slug_crc: any) {
            this.NewsService.getNewArtclesCate(
                  this.slug_crc,
                  this.page
            ).subscribe();
      }
}
