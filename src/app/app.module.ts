import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './shared/layout/layout.module';
import { NewsModule } from './modules/news/news.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthModule } from './modules/auth/auth.module';
import { HttpInterceptorInterceptor } from './intercepter/http.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ToastrComponent } from './shared/components/toastr/toastr.component';
@NgModule({
      declarations: [AppComponent, ToastrComponent],
      imports: [
            BrowserModule,
            AppRoutingModule,
            LayoutModule,
            NewsModule,
            BrowserAnimationsModule,
            FontAwesomeModule,
            HttpClientModule,
            AuthModule,
            BrowserAnimationsModule, // required animations module
            ToastrModule.forRoot({
                  timeOut: 5000,
                  positionClass: 'toast-bottom-right',
                  preventDuplicates: true,
            }),
      ],
      providers: [
            {
                  provide: HTTP_INTERCEPTORS,
                  useClass: HttpInterceptorInterceptor,
                  multi: true,
            },
      ],
      bootstrap: [AppComponent],
})
export class AppModule {}
