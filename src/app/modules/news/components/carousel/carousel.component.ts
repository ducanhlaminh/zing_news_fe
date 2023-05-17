import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'slick-carousel';
import { NewsService } from '../../services/news.service';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit, OnInit {
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 5,
    prevArrow: false,
    nextArrow: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  books: any;
  constructor(private NewsService: NewsService) {}
  ngAfterViewInit() {
    (<any>$('.carousel')).slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      adaptiveHeight: true,

      // Cấu hình và tùy chọn khác cho Slick Carousel
    });
  }
  ngOnInit(): void {
    this.getBooks();
  }
  getBooks() {
    this.NewsService.getBooks().subscribe((data: any) => {
      this.books = data.books;
    });
  }
}
