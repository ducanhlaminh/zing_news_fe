import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGoogleSuccessComponent } from './components/content/login-google-success/login-google-success.component';

const routes: Routes = [
  {
    path: 'login-success/:id',
    component: LoginGoogleSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
