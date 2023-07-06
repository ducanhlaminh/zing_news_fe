import { Component, OnInit } from '@angular/core';
import {
      faEllipsisVertical,
      faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { NewsService } from 'src/app/modules/news/services/news.service';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
@Component({
      selector: 'app-manage-articles',
      templateUrl: './manage-articles.component.html',
      styleUrls: ['./manage-articles.component.scss'],
})
export class ManageArticlesComponent implements OnInit {
      faEllipsisVertical = faEllipsisVertical;
      faCaretDown = faCaretDown;
      articles: any = [];
      length = 100;
      pageSize = 10;
      pageIndex: any = 0;
      pageEvent!: PageEvent;

      constructor(private NewService: NewsService) {}
      ngOnInit(): void {
            this.NewService.getAllByAd({ page: this.pageIndex + 1 }).subscribe(
                  (data: any) => {
                        this.articles = data.rows;
                        this.length = data.count;
                  }
            );
      }
      handlePageEvent(e: any) {
            this.pageEvent = e;
            this.length = e.length;
            this.pageSize = e.pageSize;
            this.pageIndex = e.pageIndex;
            this.NewService.getAllByAd({ page: this.pageIndex + 1 }).subscribe(
                  (data: any) => {
                        this.articles = data.rows;
                        this.length = data.count;
                  }
            );
      }
}
