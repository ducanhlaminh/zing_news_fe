import {
      CdkDragDrop,
      moveItemInArray,
      transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Renderer2, OnInit } from '@angular/core';
import { NewsService } from 'src/app/modules/news/services/news.service';
import {
      faEllipsisVertical,
      faCaretDown,
      faCaretUp,
      faAngleDown,
      faAngleUp,
      faSort,
} from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';
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
      formCreate!: FormGroup;
      constructor(
            public renderer: Renderer2,
            private NewsService: NewsService
      ) {}
      ngOnInit() {
            this.getHotNews();
      }
      artclesHotMain: any = {
            left: [],
            right: [],
            center: [],
      };
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
      sourceItems: any = ['Item 1', 'Item 2', 'Item 3'];
      destinationItems: any = [];
      onItemMoved(event: any) {
            // Xử lý việc cắt và dán ở đây
            const itemIndex = this.sourceItems.indexOf(event.item.data);
            if (itemIndex > -1) {
                  this.sourceItems.splice(itemIndex, 1);
                  this.destinationItems.push(event?.item?.data);
            }
      }
      drop(event: CdkDragDrop<string[]>) {
            moveItemInArray(
                  this.listArticles,
                  event.previousIndex,
                  event.currentIndex
            );
      }
      drop2(event: CdkDragDrop<string[]>, index: any) {
            if (event.previousContainer === event.container) {
                  moveItemInArray(
                        this.listArticles,
                        event.previousIndex,
                        event.currentIndex
                  );
            } else {
                  console.log(event);
            }

            console.log(this.listArticles);
            console.log(this.list[index].array);
      }
      handleImageError(event: any) {
            const fallbackImage =
                  'https://nic.gov.vn/wp-content/plugins/elementor/assets/images/placeholder.png';
            this.renderer.setAttribute(event.target, 'src', fallbackImage);
      }
      getHotNews() {
            this.NewsService.getHotMain().subscribe((data: any) => {
                  this.listArticles = data.hot_news.hot_main;
                  const result = Array(8)
                        .fill(null)
                        .map((_, index) => {
                              const post = data.hot_news.hot_main.find(
                                    (item: any) => item.position === index + 1
                              );
                              return post
                                    ? post
                                    : {
                                            position: index + 1,
                                            new_article: null,
                                      };
                        });
                  data.hot_news.hot_main.map((item: any) => {
                        this.list[item.position - 1].array = [item];
                  });
                  console.log(this.list);
            });
      }
}
