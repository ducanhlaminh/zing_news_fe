import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeContentComponent } from './components/contents/home-content/home-content.component';
import { CategoryContentComponent } from './components/contents/category-content/category-content.component';
import { SearchContentComponent } from './components/contents/search-content/search-content.component';
import { CreatePostComponent } from './components/contents/admin/create-post/create-post.component';
import { DetailContentComponent } from './components/contents/detail-content/detail-content.component';
import { CheckRoleGuard } from 'src/app/Guards/check-role.guard';

const routes: Routes = [
  {
    path: 'trang-chu',
    component: HomeContentComponent,
  },
  {
    path: 'danh-muc/:slug/:slug_crc',
    component: CategoryContentComponent,
  },
  {
    path: 'bai-viet/:slug/:slug_crc',
    component: DetailContentComponent,
  },
  {
    path: 'admin/create-post',
    component: CreatePostComponent,
    // canActivate: [CheckRoleGuard],
  },
  {
    path: 'tim-kiem',
    component: SearchContentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
