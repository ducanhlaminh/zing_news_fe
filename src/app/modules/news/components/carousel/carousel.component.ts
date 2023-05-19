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
  books = [
    {
      id: 4,
      slug: 'khuc-tramg-ca-3',
      slug_crc: 1166645183,
      content:
        'Elizabeth Wraige nhớ lại lần đầu tiên bà đưa ra chẩn đoán về căn bệnh SMA cho một bệnh nhi. Bệnh nhân của bà được sinh ra trong niềm vui sướng khôn xiết của cha mẹ 6 tháng trước đó.\n\nTuy nhiên, họ bắt đầu cảm thấy có gì đó không ổn, khi cậu bé dường như k',
      sapo: 'Bơi lội giúp trẻ khỏe mạnh, năng động, tăng sức bền, cải thiện sức khỏe tim mạch, đặc biệt là hạn chế nguy cơ đuối nước.',
      status: 1,
      views: 0,
      created_user_id: null,
      publishAt: '2023-05-17T09:38:34.000Z',
      title: 'Khúc tráng ca thảo nguyên từ Trung Á 3',
      avatar:
        'https://znews-photo.zingcdn.me/w210/Uploaded/natmts/2023_05_14/bia_3_bo.jpg',
      createdAt: '2023-05-17T09:38:09.000Z',
      updatedAt: '2023-05-17T09:38:34.000Z',
    },
  ];
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
