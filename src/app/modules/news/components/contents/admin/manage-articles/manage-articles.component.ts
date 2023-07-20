import { Component, OnInit } from '@angular/core';
import {
      faEllipsisVertical,
      faCaretDown,
      faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { NewsService } from 'src/app/modules/news/services/news.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, debounceTime, switchMap } from 'rxjs';
import { CategoryService } from 'src/app/modules/news/services/category.service';
@Component({
      selector: 'app-manage-articles',
      templateUrl: './manage-articles.component.html',
      styleUrls: ['./manage-articles.component.scss'],
})
export class ManageArticlesComponent implements OnInit {
      faEllipsisVertical = faEllipsisVertical;
      faCaretDown = faCaretDown;
      faCaretUp = faCaretUp;

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
      optionSubCategories: any = [];
      idSelectedCate: any;

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

      order: any = [];
      queries: any = {};
      constructor(
            private NewService: NewsService,
            private CategoryService: CategoryService,
            private formBuilder: FormBuilder
      ) {}
      ngOnInit(): void {
            this.initForm();
            this.initForm2();
            if (this.order.length > 0) this.queries.order = this.order;
            this.queries.page = this.pageIndex + 1;
            this.NewService.getAllByAd({ ...this.queries }).subscribe(
                  (data: any) => {
                        this.articles = data.rows;
                        this.length = data.count;
                        this.listArticles = [...data.rows];
                  }
            );
            this.getHotMain();
            this.optionCategories = this.CategoryService.categories;
      }
      sreach() {
            console.log(this.myForm.value);

            this.myForm
                  .get('nameArticle')
                  ?.valueChanges.pipe(
                        debounceTime(500),
                        switchMap((value) =>
                              this.NewService.getArticlesByTitle(
                                    '',
                                    value || ''
                              )
                        )
                  )
                  .subscribe((data: any) => (this.option = data.data.rows));
      }
      sreach2() {
            console.log(2);

            this.myForm2
                  .get('nameArticle')
                  ?.valueChanges.pipe(
                        debounceTime(500),
                        switchMap((value) =>
                              this.NewService.getArticlesByTitle(
                                    this.idSelectedCate,
                                    value || ''
                              )
                        )
                  )
                  .subscribe((data: any) => {
                        this.option2 = data;
                  });
      }
      initForm() {
            this.myForm = this.formBuilder.group({
                  nameArticle: ['', Validators.required],
                  position: ['', Validators.required],
            });
      }
      initForm2() {
            this.myForm2 = this.formBuilder.group({
                  nameArticle: [''],
                  nameCategory: [''],
                  nameSubCategory: [''],
                  position: [''],
            });
      }

      createHotArticle() {
            this.NewService.createHotMain({
                  id: this.myForm.value.nameArticle.id,
                  position: this.myForm.value.position,
            }).subscribe(() => {
                  this.getHotMain();
                  this.myForm.patchValue({ nameArticle: '', position: '' });
            });
      }
      onChangeCate(e: any) {
            this.idSelectedCate = e.value.id;
            this.optionSubCategories = e.value.childCategories;
      }
      getOptionText(option: any) {
            return option.title;
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

            this.NewService.getAllByAd({ ...this.queries }).subscribe(
                  (data: any) => {
                        this.articles = data.rows;
                        this.length = data.count;
                  }
            );
      }
      deleteHotMain(id: number, position: number): void {
            this.NewService.deleteHotMain({ id, position }).subscribe(() =>
                  this.getHotMain()
            );
      }
      createHotCateArticles() {
            console.log(this.myForm2.value);
      }
      getHotMain() {
            this.NewService.getHotMain().subscribe(
                  (data) => (this.listHotArticles = data)
            );
      }
      getHotCateArticles(crc: any) {
            this.NewService.getartclesHotCate(crc).subscribe(
                  (data: any) =>
                        (this.listHotCateArticles = data.hotArticlesCate)
            );
      }
      updateItem(item: any) {
            this.update = false;

            this.myForm?.setValue({
                  nameArticle: item.new_article,
                  position: item.position,
            });
      }
      updateHot() {
            this.NewService.updateHotMain({
                  id: this.myForm.value.nameArticle.id,
                  position: this.myForm.value.position,
            }).subscribe(() => {
                  this.getHotMain();
                  this.myForm.patchValue({ nameArticle: '', position: '' });
                  this.update = true;
            });
      }
      cancel() {
            this.update = true;
            this.myForm.patchValue({ nameArticle: '', position: '' });
      }
}
