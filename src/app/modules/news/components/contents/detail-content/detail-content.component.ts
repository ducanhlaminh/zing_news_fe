import { Component, OnInit, Renderer2, ViewChild } from "@angular/core";
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
export class DetailContentComponent implements OnInit {
    content!: string;
    relateArticles: Article[] = [];
    slug_crc: any;
    page = 1;
    date: any;
    categories: CategoriesBreadCump[] = [];
    faChevronRight = faChevronRight;

    @ViewChild("content") contentTag: any;
    constructor(
        private ActivatedRoute: ActivatedRoute,
        private Router: Router,
        private NewsService: NewsService,
        public renderer: Renderer2
    ) {}
    ngOnInit(): void {
        this.scrollToTop();
        this.ActivatedRoute.params.subscribe((params: any) => {
            this.slug_crc = params["slug_crc"];
            const slug = params["slug"];
            this.getContentArticle(slug, this.slug_crc);
        });
        this.Router.events.subscribe((e: any) => {
            this.page = 1;
            this.scrollToTop();
        });
    }
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    getContentArticle(slug: any, slug_crc: any) {
        this.NewsService.getDetail(slug, slug_crc).subscribe((data: any) => {
            if (data.message) {
                this.Router.navigateByUrl("/trang-chu");
            }
            this.contentTag.nativeElement.innerHTML = data.article.content;
            this.categories = data.category;
            this.date = data.article.createdAt;
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
