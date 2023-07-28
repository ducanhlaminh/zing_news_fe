import { Component, OnInit } from '@angular/core';
import {
      faEllipsisVertical,
      faCaretDown,
      faCaretUp,
      faXmark,
      faEdit,
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
      faXmark = faXmark;
      faEdit = faEdit;

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
            this.getOptionCategories();
      }
      getOptionCategories() {
            this.CategoryService.getAllCategoriesByAd().subscribe(
                  (data: any) => {
                        this.CategoryService.categories = data.rows;
                        this.CategoryService.categories.map((item: any) => {
                              item.opened = false;
                        });
                        this.optionCategories = this.CategoryService.categories;
                        const tempArray = this.optionCategories.map(
                              (item: any) => [item, ...item.childCategories]
                        );
                        const arrayB = tempArray.flat();
                        this.optionCategories = arrayB;
                  }
            );
      }
      initForm() {
            this.myForm = this.formBuilder.group({
                  nameArticle: ['', Validators.required],
                  position: ['', Validators.required],
            });
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
      initForm2() {
            this.myForm2 = this.formBuilder.group({
                  article: [''],
                  category: [''],
                  position: [''],
            });
            this.myForm2
                  .get('article')
                  ?.valueChanges.pipe(
                        debounceTime(500),
                        switchMap((value) =>
                              this.NewService.getArticlesByTitle(
                                    this.selectedCate.id,
                                    value || ''
                              )
                        )
                  )
                  .subscribe((data: any) => {
                        this.option2 = data;
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
            this.selectedCate = e.value;
            e.value && this.getArtclesHotCate(this.selectedCate);
      }
      getOptionText(option: any) {
            return option.title;
      }
      getOption2Text(option: any) {
            return option.new_article?.title;
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
      deleteHotCate(item: any): void {
            this.NewService.deleteHotCate({
                  article_id: item.article_id,
                  position: item.position,
                  category_id: item.category_id,
            }).subscribe(() => this.getArtclesHotCate(this.selectedCate));
      }
      getArtclesHotCate(e: any) {
            this.NewService.getartclesHotCate(e.slug_crc).subscribe(
                  (data: any) =>
                        (this.listHotCateArticles = data.hotArticlesCate)
            );
      }
      createHotCateArticles() {
            this.NewService.createArtclesHotCate({
                  article_id: this.myForm2.value.article.article_id,
                  position: this.myForm2.value.position,
                  category_id: this.myForm2.value.category.id,
            }).subscribe(() => {
                  this.getArtclesHotCate(this.selectedCate);
                  this.myForm2.patchValue({
                        article: '',
                        position: '',
                  });
            });
      }
      getHotMain() {
            this.NewService.getHotMain().subscribe((data: any) => {
                  (this.listHotArticles = data),
                        (this.listHotCateArticles =
                              data.hot_news.hot_categories);
            });
      }
      updateItem(item: any) {
            this.update = false;

            this.myForm?.setValue({
                  nameArticle: item.new_article,
                  position: item.position,
            });
      }
      updateItem2(item: any) {
            this.updateHotCate = false;

            this.myForm2?.patchValue({
                  article: item,
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
      updateHotCateArticle() {
            this.NewService.updateArtclesHotCate({
                  position: this.myForm2.value.position,
            }).subscribe(() => {
                  this.getArtclesHotCate(this.selectedCate);
                  this.myForm2.patchValue({ article: '', position: '' });
                  this.updateHotCate = true;
            });
      }
      cancel() {
            this.update = true;
            this.myForm.patchValue({ nameArticle: '', position: '' });
      }
      cancel2() {
            this.updateHotCate = true;
            this.myForm2.patchValue({ article: '', position: '' });
      }
}
