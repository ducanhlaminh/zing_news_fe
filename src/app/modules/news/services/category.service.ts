import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
@Injectable({
      providedIn: 'root',
})
export class CategoryService {
      constructor(public http: HttpClient) {}
      categories: any;
      getAllCategories() {
            return this.http.get(environment.API_CATEGORY_GET_ALL);
      }
      getAllCategoriesByAd() {
            return this.http.get(environment.API_CATEGORY_GET_ALL_ADMIN);
      }
      getSubCategory(slug_crc: any) {
            return this.http.get(
                  environment.API_CATEGORY_GET_SUB_CATE + slug_crc
            );
      }
      getSubCategoryByName(name: any) {
            return this.http.get(environment.API_CATEGORIES_BY_NAME, {
                  params: { name },
            });
      }
}
