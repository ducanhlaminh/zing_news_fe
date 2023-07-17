import { Component, OnInit } from '@angular/core';
import {
      faEllipsisVertical,
      faCaretDown,
      faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { NewsService } from 'src/app/modules/news/services/news.service';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import {
      CdkDragDrop,
      moveItemInArray,
      transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';
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
      myForm!: FormGroup;
      option: any;
      update: boolean = true;

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
            private formBuilder: FormBuilder
      ) {}
      ngOnInit(): void {
            this.initForm();
            this.myForm
                  .get('nameArticle')
                  ?.valueChanges.pipe(
                        debounceTime(500),
                        switchMap((value) =>
                              this.NewService.getArticlesByTitle(value || '')
                        )
                  )
                  .subscribe((data: any) => (this.option = data.data.rows));
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
      }
      initForm() {
            this.myForm = this.formBuilder.group({
                  nameArticle: '',
                  position: '',
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
      getHotMain() {
            this.NewService.getHotMain().subscribe(
                  (data) => (this.listHotArticles = data)
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
