import { OnInit, Component } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  artclesHotMain: any[] = [];
  artclesHotCate: any[] = [];
  newArtcles: any;
  articlesViews: any;
  constructor(public NewsService: NewsService) {}
  ngOnInit(): void {
    this.getHotNews();
    this.getNewArtcles();
    this.getArticlesViews();
  }
  // tin hot
  getHotNews() {
    this.NewsService.getHotMain().subscribe(
      (data: any) => (
        (this.artclesHotMain = data.hot_news.hot_main),
        (this.artclesHotCate = data.hot_news.hot_categories)
      )
    );
  }
  // tin moi
  getNewArtcles() {
    this.NewsService.getNewArtclesMain().subscribe(
      (data: any) => (this.newArtcles = data.newArticleCate)
    );
  }
  // tin nhieu luot doc
  getArticlesViews() {
    return this.NewsService.getArticlesView().subscribe(
      (data: any) => (this.articlesViews = data)
    );
  }
}
