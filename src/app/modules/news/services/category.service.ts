import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject } from 'rxjs';
@Injectable({
      providedIn: 'root',
})
export class CategoryService {
      constructor(public http: HttpClient) {}
      categories$ = new BehaviorSubject<any>(null);
      categoriesForAd$ = new BehaviorSubject<any>(null);
      length: any;
      getAllCategories() {
            this.http
                  .get(environment.API_CATEGORY_GET_ALL)
                  .subscribe((data: any) => {
                        let categories;
                        categories = data.rows;
                        categories.map((item: any) => {
                              item.opened = false;
                        });

                        categories.length = data.rows.length;

                        this.categories$.next(categories);
                  });
      }
      getAllCategoriesByAd() {
            this.http
                  .get(environment.API_CATEGORY_GET_ALL_ADMIN)
                  .subscribe((data: any) => {
                        const tempArray = data.rows.map((item: any) => {
                              const child = item.childCategories;
                              delete item.childCategories;
                              return [item, ...child];
                        });
                        const arrayB = tempArray.flat();
                        arrayB.length = arrayB.length;
                        this.categoriesForAd$.next(arrayB);
                  });
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
      createCategory(data: any) {
            return this.http.post(environment.API_CATEGORIES_BY_NAME, data);
      }
      deleteCategory(id: any) {
            return this.http.delete(environment.API_ADMIN_CATEGORY_DELETE, {
                  params: { id },
            });
      }

      updatePosition(data: any) {
            return this.http.put(
                  'http://localhost:4000/api/v1/categories/admin/position',
                  data
            );
      }
      updateCategory(data: any, id: any) {
            return this.http.put(
                  'http://localhost:4000/api/v1/categories/admin',

                  data,
                  { params: { id } }
            );
      }
}
