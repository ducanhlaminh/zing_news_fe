import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hot-articles-cate',
  templateUrl: './hot-articles-cate.component.html',
  styleUrls: ['./hot-articles-cate.component.scss'],
})
export class HotArticlesCateComponent {
  @Input() isCateChid: any = false;
  @Input() hotArticles: any[] = [];
}
