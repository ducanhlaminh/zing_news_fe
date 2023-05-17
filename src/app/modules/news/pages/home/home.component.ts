import { OnInit, Component } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  artclesHotMain: any;
  artclesHotCate: any;
  newArtcles: any;
  constructor(private NewsService: NewsService) {}
  ngOnInit(): void {
    this.getHotNews();
    this.getNewArtcles();
  }
  getHotNews() {
    this.NewsService.getHotMain().subscribe(
      (data: any) => (
        (this.artclesHotMain = data.hot_news.hot_main),
        (this.artclesHotCate = data.hot_news.hot_categories)
      )
    );
  }
  getNewArtcles() {
    this.NewsService.getNewArtcles().subscribe(
      (data) => (this.newArtcles = data)
    );
  }
}
