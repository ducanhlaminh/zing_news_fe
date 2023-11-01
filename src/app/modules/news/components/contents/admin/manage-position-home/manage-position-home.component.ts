import {
      CdkDragDrop,
      copyArrayItem,
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
import { environment } from 'src/environments/environment.development';
@Component({
      selector: 'app-manage-position-home',
      templateUrl: './manage-position-home.component.html',
      styleUrls: ['./manage-position-home.component.scss'],
})
export class ManagePositionHomeComponent implements OnInit {
      selectedStatus = 1;
      environment = environment;
      @ViewChild('checkAll') checkAll!: ElementRef;
      typeLayout = '1';
      categories: any[] = [];
      formSearch!: FormGroup;
      formOption!: FormGroup;
      queries: any = { page: 1 };
      statusOptions = [
            {
                  name: 'Xuất bản',
                  status: 1,
            },
            { name: 'Bản nháp', status: 0 },
      ];
      listArticles: any;
      hotArticles: any = {
            top: { data: [], length: 1 },
            bottom: { data: [], length: 3 },
            right: { data: [], length: 15 },
      };
      draggingOutsideSourceList: any;
      statusFull: boolean = false;
      constructor(
            public CategoryService: CategoryService,
            public dialog: MatDialog,
            private toastr: ToastrService,
            private formBuilder: FormBuilder,
            private NewsService: NewsService,
            public renderer: Renderer2
      ) {}
      ngOnInit(): void {
            this.formSearch = this.formBuilder.group({
                  title: '',
            });
            this.formOption = this.formBuilder.group({
                  categories_id: '1',
            });
            this.getOptionCategories();
            this.getHotNews();
      }
      enter(event: any) {
            this.draggingOutsideSourceList = event.container.id;
            if (event.container.id === '1') {
                  console.log(event.container.data.length);

                  this.statusFull = event.container.data.length === 1;
            } else if (event.container.id === 2) {
                  this.statusFull = event.container.data.length === 3;
            }
            console.log(event.container.data.length);
            console.log(this.statusFull);
      }

      drop(event: any, type: any) {
            if (event.previousContainer === event.container) {
                  moveItemInArray(
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex
                  );
            } else {
                  switch (type) {
                        case 1:
                              if (
                                    this.hotArticles.top.data.length >=
                                    this.hotArticles.top.length
                              ) {
                                    this.hotArticles.top.data = [];
                              }
                              break;
                        case 2:
                              if (
                                    this.hotArticles.bottom.data.length >=
                                    this.hotArticles.bottom.length
                              ) {
                                    this.hotArticles.bottom.data = [];
                              }
                              break;
                        case 3:
                              if (
                                    this.hotArticles.right.data.length >=
                                    this.hotArticles.right.length
                              ) {
                                    this.hotArticles.right.data = [];
                              }
                              break;
                        default:
                              break;
                  }

                  transferArrayItem(
                        event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex
                  );
            }
      }
      handleImageError(event: any) {
            const fallbackImage =
                  'https://nic.gov.vn/wp-content/plugins/elementor/assets/images/placeholder.png';
            this.renderer.setAttribute(event.target, 'src', fallbackImage);
      }

      showToart(status: boolean) {
            if (status) {
                  this.toastr.success('Cập nhật thành công');
            } else {
                  this.toastr.error('Vùi long điền đủ các trường cần thiết');
            }
      }
      getHotNews() {
            this.hotArticles = {
                  top: { data: [], length: 1 },
                  bottom: { data: [], length: 3 },
                  right: { data: [], length: 15 },
            };
            this.NewsService.getartclesHotCate(
                  this.formOption.value?.categories_id
            ).subscribe((data: any) => {
                  data.hotArticlesCate.new_articles_hot_categories.map(
                        (item: any) => {
                              if (item.position === 1) {
                                    this.hotArticles.top.data.push(item);
                              } else if (
                                    item.position > 1 &&
                                    item.position < 5
                              ) {
                                    this.hotArticles.bottom.data.push(item);
                              } else {
                                    this.hotArticles.right.data.push(item);
                              }
                        }
                  );
            });
      }
      getArticles() {
            this.NewsService.getAllByAd(this.formSearch.value).subscribe(
                  (data: any) => {
                        let array: any = [];
                        data.rows.map((item: any) => {
                              array.push({
                                    article_id: item.id,
                                    position: null,
                                    new_article: item,
                              });
                        });

                        this.listArticles = array;
                  }
            );
      }
      getOptionCategories() {
            this.CategoryService.categoriesForAd$.subscribe(
                  (data: any) => (this.categories = data?.categories)
            );
      }
      updatePosition() {
            if (this.formOption.value.categories_id === '1') {
                  let data: any = [];

                  this.NewsService.updateHotMain(data).subscribe();
            } else {
                  let data: any = [];

                  const cate = this.categories.find(
                        (category: any) =>
                              category.slug_crc ===
                              parseInt(this.formOption.value.categories_id)
                  );
                  this.NewsService.updateArtclesHotCate(
                        data,
                        cate.id
                  ).subscribe();
            }
      }
}
