import {
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
interface CategoriesBreadCump {
    id: number;
    article_id: string;
    category_id: string;
    category: Category;
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
    time: number = 0;
    mouseX: number = 0;
    mouseY: number = 0;
    categories: CategoriesBreadCump[] = [];
    faChevronRight = faChevronRight;
    checkpoints = [
        { sector: "top", time: 0 },
        { sector: "center", time: 0 },
        { sector: "footer", time: 0 },
    ];
    movemouse: any = [];
    @ViewChild("content") contentTag: any;
    timeInterval: any;
    constructor(
        private ActivatedRoute: ActivatedRoute,
        private Router: Router,
        private NewsService: NewsService,
        public renderer: Renderer2
    ) {}
    ngOnDestroy(): void {
        clearInterval(this.timeInterval);
        this.NewsService.saveData({
            slug: this.slug,
            slug_crc: this.slug_crc,
            movemouse: this.movemouse,
            checkpoints: this.checkpoints,
        }).subscribe();
    }
    ngOnInit(): void {
        this.ActivatedRoute.params.subscribe((params: any) => {
            this.slug_crc = params["slug_crc"];
            window.scrollTo({ top: 0 });
            this.slug = params["slug"];
            this.page = 1;
            this.getContentArticle(this.slug, this.slug_crc);
        });
        this.getContentArticle(this.slug, this.slug_crc);
        this.recordBehavior(0);
    }
    @HostListener("mousemove", ["$event"])
    onMouseMove(event: MouseEvent) {
        if (this.movemouse.length < 5) {
            this.movemouse.push(`${event.clientX}${event.clientY}`);
        }
    }
    @HostListener("window:scroll", ["$event"])
    onScroll(e: any): void {
        // Gọi hàm debounceScroll khi sự kiện cuộn xảy ra
        this.debounceScroll();
    }

    recordBehavior(sector: number) {
        console.log(sector);

        this.timeInterval = setInterval(() => {
            if (!document.hidden) {
                this.checkpoints[sector].time += 1000;
                console.log(
                    this.checkpoints[sector],
                    this.checkpoints[sector].time
                );
            }
        }, 1000);
    }
    debounceScroll = _.debounce(() => {
        const bottom = window.scrollY + window.innerHeight;
        const top = window.scrollY;
        const heightEle = this.contentTag.nativeElement.offsetHeight;
        //   console.log(this.contentTag.nativeElement.getBoundingClientRect());
        if (heightEle * 0.1 > top && heightEle * 0.1 < bottom) {
            clearInterval(this.timeInterval);
            this.recordBehavior(0);
        } else if (heightEle * 0.5 > top && heightEle * 0.5 < bottom) {
            clearInterval(this.timeInterval);
            this.recordBehavior(1);
        } else if (heightEle > top && heightEle < bottom) {
            clearInterval(this.timeInterval);
            this.recordBehavior(2);
        } else {
            clearInterval(this.timeInterval);
        }

        // Thực hiện các hành động khi cuộn dừng lại ở đây
    }, 800);
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
