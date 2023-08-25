import { Component, Input, Renderer2, OnInit } from '@angular/core';

@Component({
      selector: 'app-hot-articles-cate',
      templateUrl: './hot-articles-cate.component.html',
      styleUrls: ['./hot-articles-cate.component.scss'],
})
export class HotArticlesCateComponent implements OnInit {
      @Input() isCateChid: any = false;
      @Input() hotArticles: any;
      articles: any = { left: null, right: [], bottom: [] };
      constructor(public renderer: Renderer2) {}
      ngOnInit(): void {}
      handleImageError(event: any) {
            const fallbackImage =
                  'https://nic.gov.vn/wp-content/plugins/elementor/assets/images/placeholder.png';
            this.renderer.setAttribute(event.target, 'src', fallbackImage);
      }
}
