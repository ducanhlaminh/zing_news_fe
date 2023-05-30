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
  getSubCategory(slug_crc: any) {
    return this.http.get(environment.API_CATEGORY_GET_SUB_CATE + slug_crc);
  }
}
