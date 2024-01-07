import {
    AfterViewInit,
    Component,
    HostListener,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild,
} from "@angular/core";
import * as _ from "lodash";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { NewsService } from "../../../services/news.service";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Article, Category } from "../../../interfaces/news";
import { Timestamp } from "rxjs";
interface CategoriesBreadCump {
    id: number;
    article_id: string;
    category_id: string;
    category: Category;
}

interface Scroll {
    time: number;
    top: number;
    bottom: number;
}

interface DataBehaviorUser {
    slug_crc: number;
    heightContent: number;
    slug: string;
    listScrollData: Scroll[];
    currentTimestamp: number;
}
@Component({
    selector: "app-detail-content",
    templateUrl: "./detail-content.component.html",
    styleUrls: ["./detail-content.component.scss"],
})
export class DetailContentComponent implements OnInit, OnDestroy {
    content!: string;
    relateArticles: Article[] = [];
    slug_crc: string = "";
    slug: string = "";
    page = 1;
    date: any;
    categories: CategoriesBreadCump[] = [];
    faChevronRight = faChevronRight;

    @ViewChild("content") contentTag: any;
    timeInterval: any;
    timeAtPage: number = 0;
    height: number = 0;
    listScrollData: any = [];
    yTop: number = 0;
    yBottom: number = 0;
    scrollData: Scroll = {
        top: 0,
        bottom: 0,
        time: 0,
    };
    dataBehaviorUser: DataBehaviorUser = {
        slug_crc: 0,
        heightContent: 0,
        slug: "",
        listScrollData: [],
        currentTimestamp: new Date().getTime(),
    };

    constructor(
        private ActivatedRoute: ActivatedRoute,
        private Router: Router,
        private NewsService: NewsService,
        public renderer: Renderer2
    ) {}
    ngOnInit(): void {
        this.ActivatedRoute.params.subscribe((params: any) => {
            this.slug_crc = params["slug_crc"];
            this.slug = params["slug"];
            this.dataBehaviorUser.slug_crc = params["slug_crc"];
            this.dataBehaviorUser.slug = params["slug"];
            this.page = 1;

            this.scrollToTop();
        });
        this.recordBehavior();
    }
    @HostListener("window:scroll", ["$event"])
    onScroll(): void {
        // Gọi hàm debounceScroll khi sự kiện cuộn xảy ra
        this.debounceScroll();
    }

    // Sử dụng lodash để debounce hàm xử lý sự kiện cuộn
    debounceScroll = _.debounce(() => {
        console.log(this.scrollData);

        this.dataBehaviorUser.listScrollData.push(this.scrollData);
        clearInterval(this.timeInterval);
        this.scrollData = {
            top: 0, // Tọa độ phía trên
            bottom: 0,
            time: 0,
        };
        this.recordBehavior();

        // Thực hiện các hành động khi cuộn dừng lại ở đây
    }, 500);

    ngOnDestroy(): void {
        this.listScrollData.push(this.scrollData);
        this.NewsService.saveData(this.dataBehaviorUser).subscribe();
        clearInterval(this.timeInterval);
    }
    recordBehavior() {
        this.timeInterval = setInterval(() => {
            if (!document.hidden) {
                this.scrollData.time += 1000;
                console.log(this.scrollData.time);
            }
        }, 1000);
        this.scrollData.top = window.scrollY;
        this.scrollData.bottom = window.scrollY + window.innerHeight;
    }
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.getContentArticle(this.slug, this.slug_crc);
    }
    getContentArticle(slug: any, slug_crc: any) {
        this.NewsService.getDetail(slug, slug_crc).subscribe((data: any) => {
            if (data.message) {
                this.Router.navigateByUrl("/trang-chu");
            }
            this.contentTag.nativeElement.innerHTML = data.article.content;
            this.categories = data.category;
            this.date = data.article.publishAt;
            this.getRelateArticles(
                this.categories[this.categories.length - 1].category.slug_crc
            );
            this.dataBehaviorUser.heightContent =
                this.contentTag.nativeElement.offsetHeight;
        });
    }
    onScrollDown() {
        if (this.page < 10) {
            ++this.page;
            this.getRelateArticles(
                this.categories[this.categories.length - 1]?.category.slug_crc
            );
        }
    }

    formatTime(ms: number): number {
        return Math.floor(ms / 1000);
    }
    getRelateArticles(slug_crc: any) {
        this.NewsService.getNewArtclesCate(slug_crc, this.page).subscribe(
            (data: any) => {
                this.relateArticles.push(...data.newArticleCate);
                // this.relateArticles = ...this.relateArticles
            }
        );
    }
    handleImageError(event: any) {
        const fallbackImage =
            "https://nic.gov.vn/wp-content/plugins/elementor/assets/images/placeholder.png";
        this.renderer.setAttribute(event.target, "src", fallbackImage);
    }
}
