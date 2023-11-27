import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeContentComponent } from "./components/contents/home-content/home-content.component";
import { CategoryContentComponent } from "./components/contents/category-content/category-content.component";
import { SearchContentComponent } from "./components/contents/search-content/search-content.component";
import { DetailContentComponent } from "./components/contents/detail-content/detail-content.component";
import { CheckRoleGuard } from "src/app/Guards/check-role.guard";
import { CreatePostContentComponent } from "./components/contents/admin/create-post-content/create-post-content.component";
import { LayoutMainComponent } from "src/app/shared/layout/page/layout-main/layout-main.component";
import { LayoutDetailComponent } from "src/app/shared/layout/page/layout-detail/layout-detail.component";
import { LayoutAdminComponent } from "src/app/shared/layout/page/layout-admin/layout-admin.component";
import { ManageArticlesComponent } from "./components/contents/admin/manage-articles/manage-articles.component";
import { ManageCategoriesComponent } from "./components/contents/admin/manage-categories/manage-categories.component";
import { PreviewContentComponent } from "./components/contents/admin/preview-content/preview-content.component";
import { EditArticleComponent } from "./components/contents/admin/edit-article/edit-article.component";
import { ManageUserComponent } from "./components/contents/admin/manage-user/manage-user.component";
import { CreateUserComponent } from "./components/contents/admin/create-user/create-user.component";
import { ManagePositionCategoriesComponent } from "./components/contents/admin/manage-position-categories/manage-position-categories.component";
import { ManagePositionHomeComponent } from "./components/contents/admin/manage-position-home/manage-position-home.component";
import { EditUserComponent } from "./components/contents/admin/edit-user/edit-user.component";
import { ProfileComponent } from "./components/contents/admin/profile/profile.component";
const routes: Routes = [
    {
        path: "admin",
        component: LayoutAdminComponent,
        children: [
            {
                path: "nguoi-dung",
                redirectTo: "nguoi-dung/quan-ly-nguoi-dung",
                pathMatch: "full",
            },
            {
                path: "nguoi-dung",
                children: [
                    {
                        path: "quan-ly-nguoi-dung",
                        component: ManageUserComponent,
                        //     canActivate: [CheckRoleGuard],
                    },
                    {
                        path: "profile",
                        component: ProfileComponent,
                        //     canActivate: [CheckRoleGuard],
                    },
                    {
                        path: "tao-nguoi-dung",
                        component: CreateUserComponent,
                        //     canActivate: [CheckRoleGuard],
                    },
                ],
            },
            {
                path: "quan-ly-vi-tri-trang-chu",
                component: ManagePositionHomeComponent,
                //     canActivate: [CheckRoleGuard],
            },

            {
                path: "quan-ly-vi-tri-chuyen-muc",
                component: ManagePositionCategoriesComponent,
                //     canActivate: [CheckRoleGuard],
            },
            {
                path: "bai-viet",
                redirectTo: "bai-viet/quan-ly-bai-viet",
                pathMatch: "full",
            },
            {
                path: "bai-viet",
                children: [
                    {
                        path: "tao-bai-viet",
                        component: CreatePostContentComponent,
                        //     canActivate: [CheckRoleGuard],
                    },
                    {
                        path: "chinh-sua-bai-viet/:slug/:slug_crc",
                        component: EditArticleComponent,
                        //     canActivate: [CheckRoleGuard],
                    },
                    {
                        path: "quan-ly-bai-viet",
                        component: ManageArticlesComponent,
                        //     canActivate: [CheckRoleGuard],
                    },
                    {
                        path: "quan-ly-danh-muc",
                        component: ManageCategoriesComponent,
                        //     canActivate: [CheckRoleGuard],
                    },
                ],
            },
        ],
    },
    {
        path: "",
        component: LayoutMainComponent,
        children: [
            {
                path: "trang-chu",
                component: HomeContentComponent,
            },
            {
                path: "danh-muc/:slug/:slug_crc",
                component: CategoryContentComponent,
            },

            {
                path: "tim-kiem",
                component: SearchContentComponent,
            },
        ],
    },
    {
        path: "",
        component: LayoutDetailComponent,
        children: [
            {
                path: "bai-viet/:slug/:slug_crc",
                component: DetailContentComponent,
            },
            {
                path: "preview",
                component: PreviewContentComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NewsRoutingModule {}
