import { Component, OnInit } from '@angular/core';
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
            private UserService: UserService
      ) {}
      ngOnInit(): void {
            this.CategoryService.getAllCategoriesByAd({});
            this.UserService.inforUser$.subscribe((data) => {
                  this.inforUser = data;
            });
      }
      showFiller = true;
      faPenSquare = faPenToSquare;
      faListCheck = faListCheck;
      faNewspaper = faNewspaper;
      faTags = faTags;
      timeOut: any;
      navItem = [
            {
                  title: 'Bài viết',
                  opened: false,
                  icon: 'description',
                  sub: [
                        {
                              title: 'Tất cả bài viết',
                              selected: false,
                              url: 'admin/quan-ly-bai-viet',
                        },
                        {
                              title: 'Viết bài viết mới',
                              selected: false,
                              url: 'admin/tao-bai-viet',
                        },
                        {
                              title: 'Chuyên mục',
                              selected: false,
                              url: 'admin/quan-ly-danh-muc',
                        },
                  ],
            },
            {
                  title: 'Bố cục',
                  opened: false,
                  icon: 'bookmark',
                  sub: [
                        {
                              title: 'Trang chủ',
                              selected: false,
                              url: 'admin/quan-ly-danh-muc',
                        },
                        {
                              title: 'Trang chuyên mục',
                              selected: false,
                              url: 'admin/quan-ly-danh-muc',
                        },
                  ],
            },
            {
                  title: 'Người dùng',
                  opened: false,
                  icon: 'account_circle',
                  sub: [
                        {
                              title: 'Tất cả người dùng',
                              selected: false,
                              url: 'admin/quan-ly-danh-muc',
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
}
