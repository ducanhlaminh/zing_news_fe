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
  getArticlesByTitle(title: string) {
    return this.http.get(environment.API_NEW_ARTCLES_TITLE, {
      params: { title },
    });
  }
  getArticlesView(slug_crc: any = undefined) {
    if (slug_crc) {
      return this.http.get(environment.API_ARTICLES_VIEWS, {
        params: { slug_crc },
      });
    }
    return this.http.get(environment.API_ARTICLES_VIEWS);
  }
  getartclesHotCate(slug_crc: string) {
    return this.http.get(environment.API_ARTICLES_HOT_CATE, {
      params: { slug_crc },
    });
  }
  getDetail(slug: string, slug_crc: string) {
    return this.http.get(environment.API_GET_DETAIL + slug + '/' + slug_crc);
  }
}
