import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginGoogleSuccessComponent } from './components/content/login-google-success/login-google-success.component';


@NgModule({
  declarations: [
    LoginGoogleSuccessComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
