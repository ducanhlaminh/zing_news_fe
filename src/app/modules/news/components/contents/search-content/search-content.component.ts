import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../../services/news.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-search-content',
  templateUrl: './search-content.component.html',
  styleUrls: ['./search-content.component.scss'],
})
export class SearchContentComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  articles: any;
  searchControl: FormControl = new FormControl();
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private NewService: NewsService
  ) {}
  ngOnInit(): void {
    this.ActivatedRoute.queryParams.subscribe((query: any) => {
      const title = query['title'];
      this.getArticlesByTitle(title);
      this.searchControl.setValue(title);
    });
  }
  getArticlesByTitle(title: string) {
    this.NewService.getArticlesByTitle(title).subscribe((data: any) => {
      this.articles = data.data;
    });
  }
}
