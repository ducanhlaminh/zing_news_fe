import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() articleData: any;
  constructor(private Router: Router) {}
  navigateToDetail() {
    console.log(`bai-viet/${this.articleData?.new_article.slug_crc}`);

    this.Router.navigateByUrl(
      `bai-viet/${this.articleData?.new_article.slug}/${this.articleData?.new_article.slug_crc}`
    );
  }
}
