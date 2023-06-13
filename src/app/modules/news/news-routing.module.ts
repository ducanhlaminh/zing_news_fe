import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeContentComponent } from './components/contents/home-content/home-content.component';
import { CategoryContentComponent } from './components/contents/category-content/category-content.component';
import { SearchContentComponent } from './components/contents/search-content/search-content.component';
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
    path: 'tim-kiem',
    component: SearchContentComponent,
  },
  // {
  //   path: 'bai-viet/:slug/:slug_crc',
  //   component: DetailComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
