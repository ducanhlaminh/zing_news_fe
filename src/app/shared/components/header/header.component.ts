import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../modules/news/services/category.service';
import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
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
  faMagnifyingGlass = faMagnifyingGlass;
  faUser = faUser;
  getCategories() {
    this.CategoryService.getAllCategories().subscribe(
      (data: any) => (
        (this.CategoryService.categories = data.categories),
        console.log('data-header')
      )
    );
  }
}
