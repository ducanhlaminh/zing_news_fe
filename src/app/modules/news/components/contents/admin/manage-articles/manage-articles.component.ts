import { Component, OnInit } from '@angular/core';
import {
      faEllipsisVertical,
      faCaretDown,
      faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { NewsService } from 'src/app/modules/news/services/news.service';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import {
      CdkDragDrop,
      moveItemInArray,
      transferArrayItem,
} from '@angular/cdk/drag-drop';
@Component({
      selector: 'app-manage-articles',
      templateUrl: './manage-articles.component.html',
      styleUrls: ['./manage-articles.component.scss'],
})
export class ManageArticlesComponent implements OnInit {
      faEllipsisVertical = faEllipsisVertical;
      faCaretDown = faCaretDown;
      faCaretUp = faCaretUp;
      articles: any = [];
      length = 100;
      pageSize = 10;
      pageIndex = 0;
      listArticles: any = [];
      listHotArticles: any = [];
      typefilters = ['', 'DESC', 'ASC'];
      filterCurr: any = {
            id: 0,
            title: 0,
            views: 0,
            category_id: 0,
            status: 0,
            publishAt: 0,
            slug: 0,
      };
      items = ['Carrots', 'Tomatoes', 'Onions', 'Apples', 'Avocados'];

      basket = ['Oranges', 'Bananas', 'Cucumbers'];
      order: any = [];
      queries: any = {};
      constructor(private NewService: NewsService) {}
      ngOnInit(): void {
            if (this.order.length > 0) this.queries.order = this.order;
            this.queries.page = this.pageIndex + 1;
            this.NewService.getAllByAd({ ...this.queries }).subscribe(
                  (data: any) => {
                        this.articles = data.rows;
                        this.length = data.count;
                        this.listArticles = [...data.rows];
                  }
            );
      }
      handlePageEvent(e: any) {
            this.length = e.length;
            this.pageSize = e.pageSize;
            this.pageIndex = e.pageIndex;
            if (this.order.length > 0)
                  this.queries.order = JSON.stringify(this.order);
            this.queries.page = this.pageIndex + 1;
            this.NewService.getAllByAd({ ...this.queries }).subscribe(
                  (data: any) => {
                        this.articles = data.rows;
                        this.length = data.count;
                  }
            );
      }
      drop(event: CdkDragDrop<string[]>) {
            console.log(event.previousIndex, event.currentIndex);

            if (event.previousContainer === event.container) {
                  moveItemInArray(
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex
                  );
            } else {
                  transferArrayItem(
                        event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex
                  );
            }
            console.log(this.listHotArticles);
      }
      filterFn(type: any) {
            ++this.filterCurr[type];
            if (this.filterCurr[type] > 2) {
                  this.filterCurr[type] = 0;
            }
            let filtered: any = {
                  id: 0,
                  title: 0,
                  views: 0,
                  category_id: 0,
                  status: 0,
                  publishAt: 0,
                  slug: 0,
            };
            for (let key in this.filterCurr) {
                  if (this.filterCurr.hasOwnProperty(key)) {
                        filtered[key] = this.typefilters[this.filterCurr[key]];
                  }
            }
            this.order = [];
            for (let key in filtered) {
                  if (filtered.hasOwnProperty(key) && filtered[key]) {
                        this.order.push([key, filtered[key]]);
                  }
            }
            if (this.order.length > 0)
                  this.queries.order = JSON.stringify(this.order);
            this.queries.page = this.pageIndex + 1;

            this.NewService.getAllByAd({ ...this.queries }).subscribe(
                  (data: any) => {
                        this.articles = data.rows;
                        this.length = data.count;
                  }
            );
      }
}
