import {
      CdkDragDrop,
      moveItemInArray,
      transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
      Component,
      Renderer2,
      OnInit,
      ElementRef,
      ViewChild,
} from '@angular/core';
import { NewsService } from 'src/app/modules/news/services/news.service';
import {
      faEllipsisVertical,
      faCaretDown,
      faCaretUp,
      faAngleDown,
      faAngleUp,
      faSort,
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/modules/news/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
      selector: 'app-manage-position-home',
      templateUrl: './manage-position-home.component.html',
      styleUrls: ['./manage-position-home.component.scss'],
})
export class ManagePositionHomeComponent implements OnInit {
      faEllipsisVertical = faEllipsisVertical;
      faCaretDown = faCaretDown;
      faCaretUp = faCaretUp;
      faAngleDown = faAngleDown;
      faAngleUp = faAngleUp;
      faSort = faSort;
      selectedStatus = 1;
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
            private formBuilder: FormBuilder,
            private NewsService: NewsService
      ) {}
      ngOnInit(): void {
            this.getHotNews();
      }
      getCategories() {
            for (var key in this.formFilter?.value) {
                  if (this.formFilter.value[key] === null) {
                        delete this.formFilter.value[key];
                  }
            }

            this.pageIndex = 0;
            this.queries.page = this.pageIndex + 1;
            this.CategoryService.getAllCategoriesByAd({
                  ...this.queries,
                  ...this.formFilter?.value,
            });
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
      drop(event: CdkDragDrop<string[]>) {
            moveItemInArray(
                  this.listArticles,
                  event.previousIndex,
                  event.currentIndex
            );
            let dataUpdate: any = [];
            this.listArticles.map((article: any, index: any) => {
                  dataUpdate.push({
                        article_id: article.article_id,
                        position: index + 1,
                  });
            });
            console.log(dataUpdate);
      }

      showToart(status: boolean) {
            if (status) {
                  this.toastr.success('Cập nhật thành công');
            } else {
                  this.toastr.error('Vùi long điền đủ các trường cần thiết');
            }
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
                  category_id: item.parentCategory.id,
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
      updateItem() {
            this.CategoryService.updateCategory(
                  this.formEdit.value,
                  this.selectedItem.id
            ).subscribe(() => {
                  this.getCategories();
            });
      }

      listArticles: any;
      list: any[] = [
            { array: [] },
            { array: [] },
            { array: [] },
            { array: [] },
            { array: [] },
            { array: [] },
            { array: [] },
            { array: [] },
      ];
      getHotNews() {
            this.NewsService.getHotMain().subscribe((data: any) => {
                  let array = Array(8);

                  // array.map((item: any, index: any) => {
                  //       const result = data.hot_news.hot_main.find(
                  //             (itemResult: any) =>
                  //                   itemResult?.position === index + 1
                  //       );
                  //       // if (!result) {
                  //       //       array[index] = {
                  //       //             article_id: null,
                  //       //             position: index + 1,
                  //       //             new_article: null,
                  //       //       };
                  //       // } else {
                  //       //       array[index] = result;
                  //       // }
                  //       console.log(result);
                  // });
                  // // console.log(array);
            });
      }
}
