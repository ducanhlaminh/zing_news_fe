import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/modules/news/services/category.service';
import { NewsService } from 'src/app/modules/news/services/news.service';
import {
      faEllipsisVertical,
      faCaretDown,
      faCaretUp,
      faXmark,
      faEdit,
      faCircleInfo,
      faSort,
} from '@fortawesome/free-solid-svg-icons';
import { DialogEditArticleComponent } from '../../dialog-edit-article/dialog-edit-article.component';
import { UserService } from 'src/app/modules/news/services/user.service';
@Component({
      templateUrl: './manage-user.component.html',
      styleUrls: ['./manage-user.component.scss'],
})
export class ManageUserComponent {
      @ViewChild('checkAll') checkAll!: ElementRef;

      faEllipsisVertical = faEllipsisVertical;
      faCaretDown = faCaretDown;
      faCaretUp = faCaretUp;
      faXmark = faXmark;
      faEdit = faEdit;
      faCircleInfo = faCircleInfo;
      faSort = faSort;

      formFilter!: FormGroup;
      formEdit!: FormGroup;
      users: any = [];
      selectQuickEdit: any;
      optionCategories: any = [];
      updateHotCate: any = true;
      filters: any;
      selectedStatus = 1;
      selectedAction: string = '1';
      listUsers: any[] = [];

      length = 100;
      pageSize = 10;
      pageIndex = 0;
      loading = false;

      order: any = [];
      queries: any = {};
      statusOptions = [
            {
                  name: 'Xuất bản',
                  status: 1,
            },
            { name: 'Bản nháp', status: 0 },
      ];
      constructor(
            private NewService: NewsService,
            private CategoryService: CategoryService,
            private formBuilder: FormBuilder,
            public dialog: MatDialog,
            private toastr: ToastrService,
            private UserService: UserService
      ) {}
      ngOnInit(): void {
            if (this.order.length > 0) this.queries.order = this.order;
            this.queries.page = this.pageIndex + 1;
            this.CategoryService.getAllCategoriesByAd({});
            this.getOptionCategories();
            this.formFilter = this.formBuilder.group({
                  name: null,
                  role_id: null,
            });
            this.getUser();
      }
      // changeSelected() {
      //       this.listUsers = [];
      //       this.articles.map((article: any) => {
      //             if (article.selected === true) {
      //                   this.listUsers.push(article.id);
      //             }
      //       });
      // }
      showToart(status: boolean, title: string = '', detail = '') {
            if (status) {
                  this.toastr.success(title, detail);
            } else {
                  this.toastr.error(title, detail);
            }
      }
      getUser() {
            this.pageIndex = 0;
            this.queries.page = this.pageIndex + 1;
            for (var key in this.formFilter.value) {
                  if (
                        this.formFilter.value[key] === null ||
                        this.formFilter.value[key] === ''
                  ) {
                        delete this.formFilter.value[key];
                  }
            }
            console.log(this.formFilter.value);

            this.UserService.getAll({
                  ...this.queries,
                  ...this.formFilter.value,
            }).subscribe((data: any) => {
                  this.users = data.rows;
                  this.length = data.count;
            });
      }
      checkAllFn(event: any): void {
            this.listUsers = [];
            this.users.map((article: any) => {
                  article.selected = event.target.checked;
                  this.listUsers.push(article.id);
            });
      }
      actionFn(value: any) {
            this.loading = true;

            if (value === '2') {
                  this.NewService.deleteArticle(this.listUsers).subscribe(
                        (data: any) => {
                              this.getUser();
                              this.showToart(true, data.message);
                              this.loading = false;
                              this.listUsers = [];
                        }
                  );
            }
      }
      deleteItem(item: any) {
            this.loading = true;
            let listUsers: any[] = [];
            listUsers.push(item.id);
            this.NewService.deleteArticle(listUsers).subscribe((data: any) => {
                  this.getUser();
                  this.showToart(true, data.message);
                  this.loading = false;
            });
      }
      getOptionCategories() {
            this.CategoryService.categoriesForAd$.subscribe((data) => {
                  this.optionCategories = data.categories;
            });
      }
      updateArticles(item: any) {
            this.loading = true;
            let listUsers: any[] = [];
            listUsers.push(item.id);
            this.NewService.updateArticle(null, listUsers).subscribe(
                  (data: any) => {
                        this.getUser();
                        this.getUser(), this.showToart(true, data.message);
                        this.loading = false;
                  }
            );
      }
      handlePageEvent(e: any) {
            this.length = e.length;
            this.pageSize = e.pageSize;
            this.pageIndex = e.pageIndex;
            if (this.order.length > 0)
                  this.queries.order = JSON.stringify(this.order);
            this.queries.page = this.pageIndex + 1;
            this.NewService.getAllByAd({ ...this.queries }).subscribe(
                  (data: any) => {
                        this.users = data.rows;
                        this.length = data.count;
                  }
            );
      }

      openDialog(data: any): void {
            const dialogRef = this.dialog.open(DialogEditArticleComponent, {
                  width: '1900px',
                  // height: '700px',
                  data,
            });
            dialogRef.afterClosed().subscribe(() => this.getUser());
      }
      close() {
            this.users.map((article: any) => {
                  if ((this.selectQuickEdit = article.id)) {
                        article.edit = false;
                  }
            });
      }
      open(item: any) {
            this.users.map((article: any) => {
                  article.edit = false;
            });
            item.edit = true;
            this.selectQuickEdit = item.id;
            let category;

            if (item.new_articles_categories.length === 1) {
                  category = item.new_articles_categories[0].category.id;
            }
            item.new_articles_categories.map((item: any) => {
                  if (item.category.parent_id !== null) {
                        category = item.category.id;
                  }
            });
            this.formEdit = this.formBuilder.group({
                  title: item.title,
                  category_id: category,
                  status: item.status,
                  slug: item.slug,
            });
      }
      submitUpdate() {
            this.loading = true;
            this.NewService.updateArticle(
                  this.formEdit.value,
                  this.selectQuickEdit
            ).subscribe((data: any) => {
                  this.getUser();
                  this.getUser(), this.showToart(true, data.message);
                  this.loading = false;
            });
      }
      viewDetail(item: any) {
            window.open(
                  `http://localhost:4200/bai-viet/${item.slug}/${item.slug_crc}`,
                  '_blank'
            );
      }
}
