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
  getNewArtclesCate(slug: string) {
    return this.http.get(environment.API_NEW_ARTCLES_CATE, {
      params: { slug },
    });
  }
  getArticlesView() {
    return this.http.get(environment.API_ARTICLES_VIEWS);
  }
  getartclesHotCate(slug_crc: string) {
    return this.http.get(environment.API_ARTICLES_HOT_CATE, {
      params: { slug_crc },
    });
  }
}
