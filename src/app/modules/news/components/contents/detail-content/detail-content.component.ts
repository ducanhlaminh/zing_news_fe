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
  @ViewChild('content') contentTag: any;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private Router: Router,
    private NewsService: NewsService
  ) {}
  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((params: any) => {
      const slug_crc = params['slug_crc'];
      const slug = params['slug'];
      this.NewsService.getDetail(slug, slug_crc).subscribe((data: any) => {
        this.content = data.article.content;
      });
    });
  }
}
