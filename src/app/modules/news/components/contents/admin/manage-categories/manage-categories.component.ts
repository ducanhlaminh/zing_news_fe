import { NgIf } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {
      faEllipsisVertical,
      faCaretDown,
      faCaretUp,
      faAngleDown,
      faAngleUp,
      faSort,
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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      faSort = faSort;
      @ViewChild('checkAll') checkAll!: ElementRef;

      articles: any = [];
      categories: any = [];
      categorySort: any = [];
      listCategories: any = [];
      done: any = [];
      length = 100;
      pageSize = 10;
      pageIndex = 0;
      typefilters = [null, 'DESC', 'ASC'];
      filterCurr: any = {
            name: 0,
            slug: 0,
      };
      formFilter!: FormGroup;
      formCreate!: FormGroup;
      selectedAction: string = '1';
      order: any = [];
      queries: any = { page: 1 };
      formEdit!: FormGroup;
      selectedItem: any;
      loading = false;
      statusOptions = [
            {
                  name: 'Xuất bản',
                  status: 1,
            },
            { name: 'Bản nháp', status: 0 },
      ];
      constructor(
            public CategoryService: CategoryService,
            public dialog: MatDialog,
            private toastr: ToastrService,
            private formBuilder: FormBuilder
      ) {}
      ngOnInit(): void {
            this.getCategories();
            this.CategoryService.getAllCategoriesParent();

            this.CategoryService.categoriesParent$.subscribe((data) => {
                  this.length = data.length;
                  this.categorySort = data.categories.filter(
                        (item: any) => item.parent_id === null
                  );
            });
            this.CategoryService.categoriesForAd$.subscribe((data) => {
                  this.length = data.length;
                  data.categories.map((item: any) => {
                        item.edit = false;
                        item.selected = false;
                  });
                  this.categories = data.categories;
            });
            if (this.order.length > 0) this.queries.order = this.order;
            this.queries.page = this.pageIndex + 1;
            this.formCreate = this.formBuilder.group({
                  name: ['', Validators.required],
                  slug: ['', Validators.required],
                  parent_id: [''],
            });
            this.formFilter = this.formBuilder.group({
                  name: [''],
            });
      }
      getCategories() {
            if (this.formFilter?.value?.name) {
                  this.pageIndex = 0;
                  this.queries.page = this.pageIndex + 1;
                  this.CategoryService.getAllCategoriesByAd({
                        ...this.queries,
                        ...this.formFilter?.value,
                  });
            } else {
                  this.CategoryService.getAllCategoriesByAd({
                        ...this.queries,
                  });
            }
      }
      checkAllFn(event: any): void {
            this.listCategories = [];
            this.categories.map((cate: any) => {
                  cate.selected = event.target.checked;
                  this.listCategories.push(cate.id);
            });
      }
      changeSelected() {
            this.listCategories = [];
            this.categories.map((cate: any) => {
                  if (cate.selected === true) {
                        this.listCategories.push(cate.id);
                  }
            });
      }
      actionFn(value: any) {
            if (value === '2') {
                  this.CategoryService.deleteCategory(
                        this.listCategories
                  ).subscribe(() => {
                        this.getCategories();
                  });
            } else if (value === '3') {
                  this.CategoryService.updateCategory(
                        { status: 1 },
                        this.listCategories
                  ).subscribe(() => {
                        this.getCategories();
                  });
            } else if (value === '4') {
                  this.CategoryService.updateCategory(
                        { status: 0 },
                        this.listCategories
                  ).subscribe(() => {
                        this.getCategories();
                  });
            }
      }
      // drop(event: CdkDragDrop<string[]>) {
      //       this.changePosition = false;
      //       if (event.previousContainer === event.container) {
      //             moveItemInArray(
      //                   event.container.data,
      //                   event.previousIndex,
      //                   event.currentIndex
      //             );
      //       } else {
      //             transferArrayItem(
      //                   event.previousContainer.data,
      //                   event.container.data,
      //                   event.previousIndex,
      //                   event.currentIndex
      //             );
      //       }
      // }
      comfirmCates() {
            this.done.map((item: any, idx: any) => {
                  item.position = idx + 1;
            });
            this.CategoryService.updatePosition(this.done).subscribe(() => {
                  this.CategoryService.getAllCategories();
                  this.showToart(true);
            });
      }
      handlePageEvent(e: any) {
            this.length = e.length;
            this.pageSize = e.pageSize;
            this.pageIndex = e.pageIndex;
            this.queries.page = this.pageIndex + 1;
            this.getCategories();
      }
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
                  this.updateCategoryAdmin();
            });
      }
      publishedCate(id: any) {
            this.CategoryService.updateCategory({ status: 1 }, id).subscribe(
                  () => {
                        this.showToart(true);
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
      deleteCate(item: any) {
            this.CategoryService.deleteCategory(item.id).subscribe(() => {
                  this.getCategories();
            });
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
            this.CategoryService.getAllCategoriesByAd({ ...this.queries });
      }
      close() {
            this.categories.map((item: any) => {
                  if (item.id === this.selectedItem.id) {
                        item.edit = false;
                  }
            });
      }
      open(item: any) {
            item.edit = true;
            this.selectedItem = item;
            console.log(this.selectedItem);
            this.formEdit = this.formBuilder.group({
                  name: item.name,
                  status: item.status,
                  slug: item.slug,
                  category_id: item?.parentCategory?.id,
            });
      }
      submitCreate() {
            if (this.formCreate.valid) {
                  this.loading = true;
                  let data = this.formCreate.value;
                  if (this.formCreate.value.parent_id === '') {
                        delete data.parent_id;
                  }

                  this.CategoryService.createCategory(data).subscribe(() => {
                        this.loading = false;
                        this.showToart(true);
                        this.getCategories();
                  });
            } else {
                  this.showToart(false);
            }
      }
}
