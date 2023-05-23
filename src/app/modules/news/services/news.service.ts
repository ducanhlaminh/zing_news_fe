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
  getNewArtclesMain() {
    return this.http.get(environment.API_NEW_ARTCLES_MAIN);
  }
  getNewArtclesCate(slug: string = 'sach', slug_crc: number = 476225655) {
    return this.http.get(
      environment.API_NEW_ARTCLES_CATE + slug + '/' + slug_crc
    );
  }
  getArticlesView() {
    return this.http.get(environment.API_ARTICLES_VIEWS);
  }
  getartclesHotCate() {
    return this.http.get(environment.API_ARTICLES_HOT_CATE);
  }
}
