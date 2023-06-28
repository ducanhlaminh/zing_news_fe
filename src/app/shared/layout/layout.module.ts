import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { FooterComponent } from '../components/footer/footer.component';
import { LayoutMainComponent } from './page/layout-main/layout-main.component';
import { SignupComponent } from './page/signup/signup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutMainComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
  ],
  exports: [
    LayoutMainComponent,
    MatButtonModule,
    SignupComponent,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    FontAwesomeModule,
  ],
})
export class LayoutModule {}
