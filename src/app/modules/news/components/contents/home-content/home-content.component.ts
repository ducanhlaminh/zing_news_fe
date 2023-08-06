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
      artclesHotMain: any;
      artclesHotCate: any = [];
      constructor(
            public NewsService: NewsService,
            public renderer: Renderer2
      ) {}
      ngOnInit(): void {
            this.getNewArtcles();
            this.getHotNews();
            this.getArticlesViews();
      }
      // tin moi
      getNewArtcles() {
            this.NewsService.getNewArtclesMain().subscribe(
                  (data: any) => (this.newArtcles = data.newArticleCate.rows)
            );
      }
      // tin nhieu luot doc
      getArticlesViews() {
            return this.NewsService.getArticlesView().subscribe(
                  (data: any) => (this.articlesViews = data)
            );
      }
      getHotNews() {
            this.NewsService.getHotMain().subscribe((data: any) => {
                  const result = Array(8)
                        .fill(null)
                        .map((_, index) => {
                              const post = data.hot_news.hot_main.find(
                                    (item: any) => item.position === index + 1
                              );
                              return post
                                    ? post
                                    : {
                                            position: index + 1,
                                            new_article: null,
                                      };
                        });
                  this.artclesHotMain = {
                        left: [
                              result[3],
                              result[4],
                              result[5],
                              result[6],
                              result[7],
                        ],
                        right: [result[1], result[2]],
                        center: [result[0]],
                  };
                  console.log(result);
            });
      }
      handleImageError(event: any) {
            const fallbackImage =
                  'https://nic.gov.vn/wp-content/plugins/elementor/assets/images/placeholder.png';
            this.renderer.setAttribute(event.target, 'src', fallbackImage);
      }
}
