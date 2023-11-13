import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {
      faMagnifyingGlass,
      faUser,
      faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/modules/news/services/category.service';
@Component({
      selector: 'app-manage-position-categories',
      templateUrl: './manage-position-categories.component.html',
      styleUrls: ['./manage-position-categories.component.scss'],
})
export class ManagePositionCategoriesComponent implements OnInit {
      faMagnifyingGlass = faMagnifyingGlass;
      faEllipsis = faEllipsis;
      faUser = faUser;
      categories: any = { selected: [], pending: [] };
      constructor(private categoryService: CategoryService) {}
      ngOnInit(): void {
            this.categoryService.categoriesForAd$.subscribe((data: any) => {
                  this.categories.pending = data?.categories.filter(
                        (cate: any) => !cate.position && !cate.parent_id
                  );
                  this.categories.selected = data?.categories.filter(
                        (cate: any) => cate.position
                  );
                  console.log(this.categories);
            });
      }
      drop(event: any) {
            console.log(event);

            if (event.previousContainer === event.container) {
                  moveItemInArray(
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex
                  );
            } else {
                  transferArrayItem(
                        event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex
                  );
            }
      }
}
