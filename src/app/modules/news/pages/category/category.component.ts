import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  CategoryCurrent: any;
  navigationSubscription: any;
  constructor(
    public CategoryService: CategoryService,
    private ActivatedRoute: ActivatedRoute,
    private Router: Router
  ) {}
  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((params: any) => {
      const slug = params['slug'];
      this.getSubCategories(slug);
    });

    this.navigationSubscription = this.Router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        const slug = this.ActivatedRoute.snapshot.params['slug'];
        this.getSubCategories(slug);
      }
    });
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  getSubCategories(slug: any): any {
    const res = this.CategoryService?.categories?.find((item: any) => {
      return item.slug === slug;
    });
    console.log(res);
    if (!res) {
      const res1 = this.CategoryCurrent?.new_categories?.find((item: any) => {
        return item.slug === slug;
      });
      console.log('2', res1);
      this.CategoryCurrent = res1;
    } else {
      console.log('first');
      this.CategoryCurrent = res;
    }
  }
}
