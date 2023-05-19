import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(public http: HttpClient) {}

  getHotMain() {
    return this.http.get(environment.API_NEWS_HOT_MAIN);
  }
  getBooks() {
    return this.http.get(environment.API_BOOKS);
  }
  getNewArtcles() {
    return this.http.get(environment.API_NEW_ARTCLES);
  }
  getArticlesView() {
    return this.http.get(environment.API_ARTICLES_VIEWS);
  }
  getartclesHotCate() {
    return this.http.get(environment.API_ARTICLES_HOT_CATE);
  }
}
