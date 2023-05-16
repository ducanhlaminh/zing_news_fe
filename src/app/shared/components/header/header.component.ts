import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../modules/news/services/news.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  categories: any;
  constructor(public NewsService: NewsService) {}
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.NewsService.getAllCategories().subscribe(
      (data: any) => (this.categories = data.categories)
    );
  }
}
