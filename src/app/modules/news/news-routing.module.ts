import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { DetailComponent } from './pages/detail/detail.component';
const routes: Routes = [
  {
    path: 'trang-chu',
    component: HomeComponent,
  },
  {
    path: 'danh-muc/:slug/:slug_crc',
    component: CategoryComponent,
  },
  {
    path: 'bai-viet/:slug/:slug_crc',
    component: DetailComponent,
  },
  {
    path: 'search/:title',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
