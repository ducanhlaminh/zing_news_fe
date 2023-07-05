import { Component, OnInit } from '@angular/core';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { NewsService } from 'src/app/modules/news/services/news.service';
@Component({
      selector: 'app-manage-articles',
      templateUrl: './manage-articles.component.html',
      styleUrls: ['./manage-articles.component.scss'],
})
export class ManageArticlesComponent implements OnInit {
      faEllipsisVertical = faEllipsisVertical;
      articles: any = [];
      constructor(private NewService: NewsService) {}
      ngOnInit(): void {
            this.NewService.getAllByAd().subscribe(
                  (data) => (this.articles = data)
            );
      }
}
