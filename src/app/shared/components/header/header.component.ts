import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../modules/news/services/category.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  categories: any;
  constructor(public CategoryService: CategoryService) {}
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.CategoryService.getAllCategories().subscribe(
      (data: any) => (
        (this.CategoryService.categories = data.categories),
        console.log('data-header')
      )
    );
  }
}
