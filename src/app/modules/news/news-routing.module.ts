import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'trang-chu',
    component: HomeComponent,
  },
  {
    path: ':slug/:slug_crc',
    component: HomeComponent,
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
