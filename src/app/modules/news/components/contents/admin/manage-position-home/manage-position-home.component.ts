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

      categories: any = [];
      categorySort: any = [];
      formSearch!: FormGroup;
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
      listArticles: any;
      list: any[] = [
            {
                  array: [
                        {
                              avatar: '1384170848',
                              title: 'Truyện tranh Việt dành cho tuổi trưởng thành',
                              sapo: '"Gửi em" có niềm vui của những ngày thanh xuân gian khó, nhiều vất vả bộn bề nhưng được sống trọn với đam mê.',
                              slug: 'truyen-tranh-viet-danh-cho-tuoi-truong-thanh',
                              slug_crc: 1384170848,
                              id: 950,
                        },
                  ],
            },
            { array: [] },
            {
                  array: [
                        {
                              avatar: '3140228865',
                              title: 'Đưa văn học nhà trường lên sân khấu: Sức sống mới cho nghệ thuật',
                              sapo: 'Các đơn vị nghệ thuật sẽ phục dựng và dàn dựng 51 vở diễn trong 70 tác phẩm văn học đặc sắc thuộc chương trình giáo dục phổ thông, tổ chức 1.800 đến 2.000 buổi diễn cho các trường.',
                              slug: 'dua-van-hoc-nha-truong-len-san-khau-suc-song-moi-cho-nghe-thuat',
                              slug_crc: 3140228865,
                              id: 952,
                        },
                  ],
            },
            {
                  array: [
                        {
                              avatar: '1775021381',
                              title: 'Phát động cuộc thi sáng tác Văn chương phương Nam',
                              sapo: 'Hội Nhà văn TP.HCM, tạp chí Văn nghệ TP.HCM và Đại học Cửu Long phối hợp tổ chức cuộc thi sáng tác Văn chương phương Nam dành cho học sinh, sinh viên.',
                              slug: 'phat-dong-cuoc-thi-sang-tac-van-chuong-phuong-nam',
                              slug_crc: 1775021381,
                              id: 953,
                        },
                  ],
            },
            {
                  array: [
                        {
                              avatar: '1196741123',
                              title: 'Góc đọc sách hè dành cho bé 3-11 tuổi',
                              sapo: 'Các bạn nhỏ sẽ được trải nghiệm đọc những cuốn sách thuộc nhiều thể loại: thơ, truyện, sách khoa học, kiến thức, kỹ năng…',
                              slug: 'goc-doc-sach-he-danh-cho-be-3-11-tuoi',
                              slug_crc: 1196741123,
                              id: 954,
                        },
                  ],
            },
            {
                  array: [
                        {
                              avatar: '3877058958',
                              title: "'Muội tro' - những nốt nhạc ngân vang công lý",
                              sapo: 'Tò mò và bất ngờ, đó là cảm nhận đầu tiên khi đọc tập truyện ngắn “Muội tro” của nhà văn Võ Chí Nhất, do NXB Tổng hợp TP Hồ Chí Minh phát hành gần đây.',
                              slug: 'muoi-tro-nhung-not-nhac-ngan-vang-cong-ly',
                              slug_crc: 3877058958,
                              id: 955,
                        },
                  ],
            },
            { array: [] },
            { array: [] },
      ];
      items = ['Carrots', 'Tomatoes', 'Onions', 'Apples', 'Avocados'];

      basket = ['Oranges', 'Bananas', 'Cucumbers'];
      constructor(
            public CategoryService: CategoryService,
            public dialog: MatDialog,
            private toastr: ToastrService,
            private formBuilder: FormBuilder,
            private NewsService: NewsService,
            public renderer: Renderer2
      ) {}
      ngOnInit(): void {
            this.getHotNews();
            this.formSearch = this.formBuilder.group({
                  title: '',
            });
            this.getOptionCategories();
      }

      handleImageError(event: any) {
            const fallbackImage =
                  'https://nic.gov.vn/wp-content/plugins/elementor/assets/images/placeholder.png';
            this.renderer.setAttribute(event.target, 'src', fallbackImage);
      }

      drop(event: CdkDragDrop<string[]>) {
            try {
                  transferArrayItem(
                        event?.previousContainer.data,
                        event?.container.data,
                        event.previousIndex,
                        event.previousIndex
                  );
                  console.log(
                        event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.previousIndex
                  );
                  console.log(event);
            } catch (error) {
                  console.log(error);
            }
      }
      drop2(event: CdkDragDrop<string[]>, data: any) {
            try {
                  this.list[data].array.length = 0;
                  transferArrayItem(
                        event?.previousContainer.data,
                        event?.container.data,
                        event.previousIndex,
                        event.currentIndex
                  );
            } catch (error) {
                  console.log(error);
            }
      }

      showToart(status: boolean) {
            if (status) {
                  this.toastr.success('Cập nhật thành công');
            } else {
                  this.toastr.error('Vùi long điền đủ các trường cần thiết');
            }
      }
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
      getArticles() {
            this.NewsService.getAllByAd(this.formSearch.value).subscribe(
                  (data: any) => (this.listArticles = data.rows)
            );
      }
      getOptionCategories() {
            this.CategoryService.categoriesForAd$.subscribe(
                  (data: any) => (this.categories = data.categories)
            );
      }
}
