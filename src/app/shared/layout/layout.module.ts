import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { FooterComponent } from '../components/footer/footer.component';
import { LayoutMainComponent } from './page/layout-main/layout-main.component';
import { SignupComponent } from './page/signup/signup.component';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutMainComponent,
    SignupComponent,
  ],
  imports: [CommonModule, LayoutRoutingModule],
  exports: [LayoutMainComponent, SignupComponent],
})
export class LayoutModule {}
