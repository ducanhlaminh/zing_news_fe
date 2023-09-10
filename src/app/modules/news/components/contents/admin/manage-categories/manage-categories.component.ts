import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {
      faEllipsisVertical,
      faCaretDown,
      faCaretUp,
      faAngleDown,
      faAngleUp,
} from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/modules/news/services/category.service';
import { DialogComponent } from '../dialog/dialog.component';
import {
      CdkDragDrop,
      CdkDrag,
      CdkDropList,
      CdkDropListGroup,
      moveItemInArray,
      transferArrayItem,
} from '@angular/cdk/drag-drop';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
      selector: 'app-manage-categories',
      templateUrl: './manage-categories.component.html',
      styleUrls: ['./manage-categories.component.scss'],
})
export class ManageCategoriesComponent {
      faEllipsisVertical = faEllipsisVertical;
      faCaretDown = faCaretDown;
      faCaretUp = faCaretUp;
      faAngleDown = faAngleDown;
      faAngleUp = faAngleUp;
      articles: any = [];
      categories: any = [];
      categorySort: any = [];
      done: any = [];
      length = 100;
      pageSize = 10;
      pageIndex = 0;
      typefilters = ['', 'DESC', 'ASC'];
      filterCurr: any = {
            id: 0,
            title: 0,
            views: 0,
            category_id: 0,
            status: 0,
            publishAt: 0,
            slug: 0,
      };
      formFilter!: FormGroup;
      selectedAction: string = '1';
      changePosition = true;
      order: any = [];
      queries: any = {};
      formEdit!: FormGroup;
      selectedItem: any;
      constructor(
            public CategoryService: CategoryService,
            public dialog: MatDialog,
            private toastr: ToastrService,
            private formBuilder: FormBuilder
      ) {}
      ngOnInit(): void {
            this.CategoryService.getAllCategoriesByAd();
            this.CategoryService.categoriesForAd$.subscribe((data) => {
                  console.log(data);

                  // this.done = data.filter(
                  //       (item: any) => item.position !== null
                  // );
                  this.categorySort = data.filter(
                        (item: any) => item.position === null
                  );
                  data.map((item: any) => (item.edit = false));
                  this.categories = data;
            });
            if (this.order.length > 0) this.queries.order = this.order;
            this.queries.page = this.pageIndex + 1;
      }
      actionFn(value: any) {
            if (value === '2') {
            } else if (value === '3' || value === '4') {
            }
      }
      drop(event: CdkDragDrop<string[]>) {
            this.changePosition = false;
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
      comfirmCates() {
            this.done.map((item: any, idx: any) => {
                  item.position = idx + 1;
            });
            this.CategoryService.updatePosition(this.done).subscribe(() => {
                  this.CategoryService.getAllCategories();
                  this.showToart(true);
            });
      }
      // handlePageEvent(e: any) {
      //       this.CategoryService.length = e.length;
      //       this.pageSize = e.pageSize;
      //       this.pageIndex = e.pageIndex;
      //       if (this.order.length > 0)
      //             this.queries.order = JSON.stringify(this.order);
      //       this.queries.page = this.pageIndex + 1;
      //       this.CategoryService.getAllCategoriesByAd().subscribe(
      //             (data: any) => {
      //                   this.CategoryService.categories = data.rows;
      //                   this.pageIndex = data.count;
      //             }
      //       );
      // }
      filterFn(type: any) {
            ++this.filterCurr[type];
            if (this.filterCurr[type] > 2) {
                  this.filterCurr[type] = 0;
            }
            let filtered: any = {
                  id: 0,
                  title: 0,
                  views: 0,
                  category_id: 0,
                  status: 0,
                  publishAt: 0,
                  slug: 0,
            };
            for (let key in this.filterCurr) {
                  if (this.filterCurr.hasOwnProperty(key)) {
                        filtered[key] = this.typefilters[this.filterCurr[key]];
                  }
            }
            this.order = [];
            for (let key in filtered) {
                  if (filtered.hasOwnProperty(key) && filtered[key]) {
                        this.order.push([key, filtered[key]]);
                  }
            }
            if (this.order.length > 0)
                  this.queries.order = JSON.stringify(this.order);
            this.queries.page = this.pageIndex + 1;

            // this.NewService.getAllByAd({ ...this.queries }).subscribe(
            //       (data: any) => {
            //             this.articles = data.rows;
            //             this.length = data.count;
            //       }
            // );
      }
      log(idx: any): any {
            if (this.categories[idx].opened === false) {
                  return (this.categories[idx].opened = true);
            }
            return (this.categories[idx].opened = false);
      }
      openDialog(data: any) {
            const dialog = this.dialog.open(DialogComponent, {
                  data,
            });
            dialog.afterClosed().subscribe(() => {
                  this.updateCategory();
                  this.updateCategoryAdmin();
            });
      }
      publishedCate(id: any) {
            this.CategoryService.updateCategory({ status: 1 }, id).subscribe(
                  () => {
                        this.showToart(true);
                        this.updateCategory();
                        this.updateCategoryAdmin();
                  }
            );
      }
      showToart(status: boolean) {
            if (status) {
                  this.toastr.success('Cập nhật thành công');
            } else {
                  this.toastr.error('Vùi long điền đủ các trường cần thiết');
            }
      }
      unPublishedCate(id: any) {
            // console.log(id);
            this.CategoryService.updateCategory({ status: 0 }, id).subscribe(
                  () => {
                        this.updateCategory();
                        this.updateCategoryAdmin();
                        this.showToart(true);
                  }
            );
      }
      updateCategoryAdmin() {
            // this.CategoryService.getAllCategoriesByAd().subscribe(
            //       (data: any) => {
            //             this.categories = data.rows;
            //             this.CategoryService.categories.map((item: any) => {
            //                   item.opened = false;
            //             });
            //             this.length = data.rows.length;
            //             this.categorySort = [...data.rows].filter(
            //                   (item: any) => item.position === null
            //             );
            //       }
            // );]
            this.CategoryService.getAllCategoriesByAd();
      }
      updateCategory() {
            // this.CategoryService.getAllCategories();
            // this.done = this.CategoryService.categories.filter(
            //       (item: any) => item.position !== null
            // );
            this.CategoryService.getAllCategories();
      }
      close() {
            this.categories.map((item: any) => {
                  if (item.id === this.selectedItem) {
                        item.edit = false;
                  }
            });
      }
      open(item: any) {
            item.edit = true;
            this.selectedItem = item.id;
            this.formEdit = this.formBuilder.group({
                  name: item.name,
                  status: item.status,
                  slug: item.slug,
                  category_id: item.id,
            });
      }
}
