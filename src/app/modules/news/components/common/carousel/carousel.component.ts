import { Component, AfterViewInit, OnInit, Renderer2 } from '@angular/core';
import * as $ from 'jquery';
import 'slick-carousel';
import { NewsService } from '../../../services/news.service';
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
  slug = '2765770276';
  books: any = [
    {
      id: 15,
      article_id: 15,
      category_id: 4,
      createdAt: '2023-05-23T17:23:33.000Z',
      updatedAt: '2023-05-23T17:23:33.000Z',
      new_article: {
        id: 15,
        title: 'Lợi dụng thói quen xấu để đem lại hiệu quả',
        slug: 'loi-dung-thoi-quen-xau-de-dem-lai-hieu-qua',
        slug_crc: 2147483647,
        content:
          'Elizabeth Wraige nhớ lại lần đầu tiên bà đưa ra chẩn đoán về căn bệnh SMA cho một bệnh nhi. Bệnh nhân của bà được sinh ra trong niềm vui sướng khôn xiết của cha mẹ 6 tháng trước đó.\n\nTuy nhiên, họ bắt đầu cảm thấy có gì đó không ổn, khi cậu bé dường như k',
        sapo: 'Tất cả những người trì hoãn đều có thói quen để dành cho công việc. Trì hoãn có tổ chức chính là nghệ thuật lợi dụng thói quen xấu đó.',
        avatar:
          'https://znews-photo.zingcdn.me/w960/Uploaded/natmts/2023_05_04/z4319512309977_51bc7365424c81b45.jpg',
        views: 0,
        publishAt: '2023-05-23T17:25:45.000Z',
        status: 1,
        created_user_id: null,
        updatedAt: '2023-05-23T17:25:45.000Z',
        createdAt: '2023-05-23T17:23:33.000Z',
      },
    },
  ];
  constructor(private NewsService: NewsService, public renderer: Renderer2) {}
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
    this.NewsService.getNewArtclesCate(this.slug).subscribe((data: any) => {
      this.books = data.newArticleCate;
    });
  }
  handleImageError(event: any) {
    const fallbackImage =
      'https://nic.gov.vn/wp-content/plugins/elementor/assets/images/placeholder.png';
    this.renderer.setAttribute(event.target, 'src', fallbackImage);
  }
}
