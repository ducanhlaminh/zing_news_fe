import { Component, Renderer2 } from '@angular/core';
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss'],
})
export class HomeContentComponent {
  newArtcles: any;
  articlesViews: any;
  artclesHotMain: any[] = [];
  artclesHotCate: any[] = [];
  constructor(public NewsService: NewsService, public renderer: Renderer2) {}
  ngOnInit(): void {
    this.getNewArtcles();
    this.getHotNews();
    this.getArticlesViews();
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
  getHotNews() {
    this.NewsService.getHotMain().subscribe(
      (data: any) => (
        (this.artclesHotMain = data.hot_news.hot_main),
        (this.artclesHotCate = data.hot_news.hot_categories)
      )
    );
  }
  handleImageError(event: any) {
    const fallbackImage =
      'https://nic.gov.vn/wp-content/plugins/elementor/assets/images/placeholder.png';
    this.renderer.setAttribute(event.target, 'src', fallbackImage);
  }
}
