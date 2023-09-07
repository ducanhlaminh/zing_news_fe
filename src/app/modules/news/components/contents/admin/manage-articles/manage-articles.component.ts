import { Component, OnInit } from '@angular/core';
import {
      faEllipsisVertical,
      faCaretDown,
      faCaretUp,
      faXmark,
      faEdit,
      faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { NewsService } from 'src/app/modules/news/services/news.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, debounceTime, switchMap } from 'rxjs';
import { CategoryService } from 'src/app/modules/news/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditArticleComponent } from '../../dialog-edit-article/dialog-edit-article.component';
import { ToastrService } from 'ngx-toastr';

declare const tinymce: any;

@Component({
      selector: 'app-manage-articles',
      templateUrl: './manage-articles.component.html',
      styleUrls: ['./manage-articles.component.scss'],
})
export class ManageArticlesComponent implements OnInit {
      faEllipsisVertical = faEllipsisVertical;
      faCaretDown = faCaretDown;
      faCaretUp = faCaretUp;
      faXmark = faXmark;
      faEdit = faEdit;
      faCircleInfo = faCircleInfo;

      formFilter!: FormGroup;
      articles: any = [];
      listArticles: any = [];
      listHotArticles: any = [];
      listHotCateArticles: any = [];
      myForm!: FormGroup;
      myForm2!: FormGroup;
      option: any;
      option2: any;
      update: boolean = true;
      optionCategories: any = [];
      selectedCate: any;
      updateHotCate: any = true;
      show = { hotMain: false, hotCate: false };
      filters: any;
      selectedStatus = 1;

      length = 100;
      pageSize = 10;
      pageIndex = 0;
      loading = false;
      filterCurr: any = {
            id: 0,
            title: 0,
            views: 0,
            category_id: 0,
            status: 0,
            publishAt: 0,
            slug: 0,
      };

      order: any = [];
      queries: any = {};
      constructor(
            private NewService: NewsService,
            private CategoryService: CategoryService,
            private formBuilder: FormBuilder,
            public dialog: MatDialog,
            private toastr: ToastrService
      ) {}
      ngOnInit(): void {
            if (this.order.length > 0) this.queries.order = this.order;
            this.queries.page = this.pageIndex + 1;

            this.getOptionCategories();
            this.formFilter = this.formBuilder.group({
                  title: null,
                  category_id: null,
                  status: null,
            });
            this.getArticles();
      }

      showToart(status: boolean, title: string = '', detail = '') {
            if (status) {
                  this.toastr.success(title, detail);
            } else {
                  this.toastr.error(title, detail);
            }
      }
      getArticles() {
            for (var key in this.formFilter.value) {
                  if (this.formFilter.value[key] === null) {
                        delete this.formFilter.value[key];
                  }
            }

            this.NewService.getAllByAd({
                  ...this.queries,
                  ...this.formFilter.value,
            }).subscribe((data: any) => {
                  this.articles = data.rows;
                  this.articles.map((article: any) => {
                        article.selected = false;
                        article.edit = false;
                  });
                  this.length = data.count;
            });
      }
      deleteAction() {
            this.loading = true;
            let listArticles: any[] = [];
            this.articles.map((article: any) => {
                  if (article.selected === true) {
                        listArticles.push(article.id);
                  }
            });
            this.NewService.deleteArticle(listArticles).subscribe(
                  (data: any) => {
                        this.getArticles();
                        this.getArticles(), this.showToart(true, data.message);
                        this.loading = false;
                  }
            );
      }
      deleteItem(item: any) {
            this.loading = true;
            let listArticles: any[] = [];
            listArticles.push(item.id);
            this.NewService.deleteArticle(listArticles).subscribe(
                  (data: any) => {
                        this.getArticles();
                        this.getArticles(), this.showToart(true, data.message);
                        this.loading = false;
                  }
            );
      }
      getOptionCategories() {
            this.CategoryService.categoriesForAd$.subscribe((categories) => {
                  console.log(categories);

                  const tempArray = categories.map((item: any) => [
                        item,
                        ...item.childCategories,
                  ]);
                  const arrayB = tempArray.flat();
                  this.optionCategories = arrayB;
            });
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
                        this.articles = data.rows;
                        this.length = data.count;
                  }
            );
      }

      getHotMain() {
            this.NewService.getHotMain().subscribe((data: any) => {
                  (this.listHotArticles = data),
                        (this.listHotCateArticles =
                              data.hot_news.hot_categories);
            });
      }

      openDialog(data: any): void {
            const dialogRef = this.dialog.open(DialogEditArticleComponent, {
                  width: '1900px',
                  // height: '700px',
                  data,
            });
            dialogRef.afterClosed().subscribe(() => this.getArticles());
      }
}
