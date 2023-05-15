import { AfterViewInit, Component } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit() {
    (<any>$('.slide-card')).slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
    });
  }
}
