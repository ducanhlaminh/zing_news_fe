import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
    faPenToSquare,
    faListCheck,
    faNewspaper,
    faTags,
    faCaretDown,
    faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";
import { CategoryService } from "src/app/modules/news/services/category.service";
import { UserService } from "src/app/modules/news/services/user.service";

@Component({
    selector: "app-layout-admin",
    templateUrl: "./layout-admin.component.html",
    styleUrls: ["./layout-admin.component.scss"],
})
export class LayoutAdminComponent implements OnInit {
    inforUser: any;
    faCaretDown = faCaretDown;
    faCaretLeft = faCaretLeft;
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
    }
    showFiller = true;
    showSidebar: boolean = true;
    navItem = [
        {
            title: "Bài viết",
            opened: false,
            icon: "assets/icon/article-svgrepo-com.svg",
            url: "bai-viet",
            role_id: [2, 1, 3, 4],
            sub: [
                {
                    title: "Tất cả bài viết",
                    role_id: [1, 2, 3, 4],
                    url: "bai-viet/quan-ly-bai-viet",
                },
                {
                    title: "Viết bài viết mới",
                    role_id: [1, 2, 4],
                    url: "bai-viet/tao-bai-viet",
                },
                {
                    title: "Chuyên mục",
                    role_id: [1, 2, 4],
                    url: "bai-viet/quan-ly-danh-muc",
                },
            ],
        },
        {
            title: "Bố cục",
            opened: false,
            icon: "assets/icon/layout-grid-1-svgrepo-com.svg",
            url: "quan-ly-vi-tri-trang-chu",
            role_id: [1, 4],
            sub: [
                {
                    title: "Set bài viết nổi bật",
                    url: "quan-ly-vi-tri-trang-chu",
                    role_id: [1, 4],
                },

                {
                    title: "Vị trí chuyên mục",
                    url: "quan-ly-vi-tri-chuyen-muc",
                    role_id: [1, 4],
                },
            ],
        },
        {
            title: "Người dùng",
            opened: false,
            icon: "assets/icon/users-svgrepo-com.svg",
            url: "nguoi-dung",
            role_id: [1, 2, 3],
            sub: [
                {
                    title: "Tất cả người dùng",
                    url: "nguoi-dung/quan-ly-nguoi-dung",
                    role_id: [1, 3],
                },
                {
                    title: "Thêm mới",
                    url: "nguoi-dung/tao-nguoi-dung",
                    role_id: [1, 3],
                },
                {
                    title: "Hồ sơ",
                    url: "nguoi-dung/profile",
                    role_id: [1, 2, 3],
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

        item.selected = true;
        event.stopPropagation();
    }
    funcShowITem(data: any) {
        if (this.inforUser.user?.role_id) {
            return data.role_id.some(
                (role_id: any) => role_id === this.inforUser.user?.role_id
            );
        }
    }
}
