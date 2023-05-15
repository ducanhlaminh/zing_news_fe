import { AfterViewInit, Component } from '@angular/core';
import * as $ from 'jquery';
import 'slick-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit() {
    (<any>$('.slider')).slick({
      // Cấu hình và tùy chọn khác cho Slick Carousel
    });
  }
}
