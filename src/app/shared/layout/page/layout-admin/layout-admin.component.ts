import { Component } from '@angular/core';
import {
      faPenToSquare,
      faListCheck,
      faNewspaper,
      faTags,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
      selector: 'app-layout-admin',
      templateUrl: './layout-admin.component.html',
      styleUrls: ['./layout-admin.component.scss'],
})
export class LayoutAdminComponent {
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
                  title: 'Trang',
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
                              title: 'Hồ sơ người dùng',
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
