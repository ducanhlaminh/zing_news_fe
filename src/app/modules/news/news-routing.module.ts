import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeContentComponent } from './components/contents/home-content/home-content.component';
import { CategoryContentComponent } from './components/contents/category-content/category-content.component';
import { SearchContentComponent } from './components/contents/search-content/search-content.component';
import { DetailContentComponent } from './components/contents/detail-content/detail-content.component';
import { CheckRoleGuard } from 'src/app/Guards/check-role.guard';
import { CreatePostContentComponent } from './components/contents/admin/create-post-content/create-post-content.component';
import { LayoutMainComponent } from 'src/app/shared/layout/page/layout-main/layout-main.component';
import { LayoutDetailComponent } from 'src/app/shared/layout/page/layout-detail/layout-detail.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      {
        path: 'trang-chu',
        component: HomeContentComponent,
      },
      {
        path: 'danh-muc/:slug/:slug_crc',
        component: CategoryContentComponent,
      },
      {
        path: 'admin/tao-bai-viet',
        component: CreatePostContentComponent,
        canActivate: [CheckRoleGuard],
      },
      {
        path: 'tim-kiem',
        component: SearchContentComponent,
      },
    ],
  },
  {
    path: '',
    component: LayoutDetailComponent,
    children: [
      {
        path: 'bai-viet/:slug/:slug_crc',
        component: DetailContentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
