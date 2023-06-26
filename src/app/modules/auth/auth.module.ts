import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginGoogleSuccessComponent } from './components/content/login-google-success/login-google-success.component';
@NgModule({
  declarations: [LoginGoogleSuccessComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
