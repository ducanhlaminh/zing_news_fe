import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
      faPenToSquare,
      faListCheck,
      faNewspaper,
      faTags,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/modules/news/services/category.service';
import { UserService } from 'src/app/modules/news/services/user.service';

@Component({
      selector: 'app-layout-admin',
      templateUrl: './layout-admin.component.html',
      styleUrls: ['./layout-admin.component.scss'],
})
export class LayoutAdminComponent implements OnInit {
      inforUser: any;
      constructor(
            private CategoryService: CategoryService,
            private UserService: UserService,
            private router: Router
      ) {}
      ngOnInit(): void {
            this.CategoryService.getAllCategoriesByAd({});
            this.UserService.inforUser$.subscribe((data) => {
                  this.inforUser = data;
            });
            this.UserService.inforUser$.subscribe((data) => {
                  this.inforUser = data;
            });
      }
      showFiller = true;
      showSidebar: boolean = true;
      faPenSquare = faPenToSquare;
      faListCheck = faListCheck;
      faNewspaper = faNewspaper;
      faTags = faTags;
      timeOut: any;
      navItem = [
            {
                  title: 'Bài viết',
                  opened: false,
                  selected: false,
                  icon: 'assets/icon/article-svgrepo-com.svg',
                  url: 'admin/bai-viet/quan-ly-bai-viet',
                  sub: [
                        {
                              title: 'Tất cả bài viết',
                              selected: false,
                              url: 'admin/bai-viet/quan-ly-bai-viet',
                        },
                        {
                              title: 'Viết bài viết mới',
                              selected: false,
                              url: 'admin/bai-viet/tao-bai-viet',
                        },
                        {
                              title: 'Chuyên mục',
                              selected: false,
                              url: 'admin/bai-viet/quan-ly-danh-muc',
                        },
                  ],
            },
            {
                  title: 'Bố cục',
                  opened: false,
                  selected: false,
                  icon: 'assets/icon/layout-grid-1-svgrepo-com.svg',
                  sub: [
                        {
                              title: 'Set bài viết nổi bật',
                              selected: false,
                              url: 'admin/quan-ly-vi-tri-trang-chu',
                        },

                        {
                              title: 'Vị trí chuyên mục',
                              selected: false,
                              url: 'admin/quan-ly-vi-tri-chuyen-muc',
                        },
                  ],
            },
            {
                  title: 'Người dùng',
                  opened: false,
                  selected: false,
                  icon: 'assets/icon/users-svgrepo-com.svg',
                  url: 'admin/quan-ly-nguoi-dung',
                  sub: [
                        {
                              title: 'Tất cả người dùng',
                              selected: false,
                              url: 'admin/quan-ly-nguoi-dung',
                        },
                        {
                              title: 'Thêm mới',
                              selected: false,
                              url: 'admin/tao-nguoi-dung',
                        },
                        {
                              title: 'Hồ sơ',
                              selected: false,
                              url: 'admin/quan-ly-danh-muc',
                        },
                  ],
            },
      ];
      hover(itemSelect: any) {
            this.navItem.map((item: any) => {
                  if (itemSelect.title === item.title) {
                        item.opened = true;
                  } else {
                        item.opened = false;
                  }
            });
      }
      navigateUrl(item: any, event: any) {
            this.navItem.map((item: any) => {
                  item.selected = false;
            });
            console.log(this.navItem);

            item.selected = true;
            event.stopPropagation();
      }
}
