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
      getArticlesByTitle(category_id: any, title: string) {
            if (category_id === '') {
                  return this.http.get(environment.API_NEW_ARTCLES_TITLE, {
                        params: { title },
                  });
            } else {
                  return this.http.get(environment.API_NEW_ARTCLES_TITLE, {
                        params: { title, category_id },
                  });
            }
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
            return this.http.get(
                  environment.API_GET_DETAIL + slug + '/' + slug_crc
            );
      }
      createArticle(data: any) {
            return this.http.post(environment.API__ADMIN_ARTICLE, data);
      }
      getAllByAd(data: any) {
            return this.http.get(environment.API__ADMIN_ARTICLE, {
                  params: { ...data },
            });
      }
      deleteHotMain(data: any) {
            return this.http.delete(environment.API_ADMIN_HOT_MAIN, {
                  params: { ...data },
            });
      }
      createHotMain(data: any) {
            return this.http.post(environment.API_NEWS_HOT_MAIN, {
                  data,
            });
      }
      updateHotMain(data: any) {
            return this.http.put(environment.API_NEWS_HOT_MAIN + data.id, data);
      }
      updateArtclesHotCate(data: any) {
            return this.http.put(
                  environment.API_ARTICLES_HOT_CATE + data.id,
                  data
            );
      }
      createArtclesHotCate(data: any) {
            return this.http.post(environment.API_ADMIN_HOT_CATE, {
                  ...data,
            });
      }
      deleteHotCate(data: any) {
            return this.http.delete(environment.API_ADMIN_HOT_CATE, {
                  params: { ...data },
            });
      }
}
