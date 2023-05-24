import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  CategoryCurrent: any;
  constructor(
    public CategoryService: CategoryService,
    private ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((params: any) => {
      const slug = params['slug'];
      this.getSubCategories(slug);
    });
  }
  getSubCategories(slug: any): any {
    const res = this.CategoryService.categories.find((item: any) => {
      return item.slug === slug;
    });
    this.CategoryCurrent = res;
  }
}
