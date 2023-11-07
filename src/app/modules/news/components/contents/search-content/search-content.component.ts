import { Component, OnInit, Renderer2 } from "@angular/core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute } from "@angular/router";
import { NewsService } from "../../../services/news.service";
import { FormControl } from "@angular/forms";
@Component({
    selector: "app-search-content",
    templateUrl: "./search-content.component.html",
    styleUrls: ["./search-content.component.scss"],
})
export class SearchContentComponent implements OnInit {
    faMagnifyingGlass = faMagnifyingGlass;
    articles: any = { list: [], count: 0 };
    searchControl: FormControl = new FormControl();
    page = 1;
    constructor(
        private ActivatedRoute: ActivatedRoute,
        private NewService: NewsService,
        public renderer: Renderer2
    ) {}
    ngOnInit(): void {
        this.ActivatedRoute.queryParams.subscribe((query: any) => {
            const title = query["title"];
            this.searchControl.setValue(title);
            this.getArticlesByTitle();
        });
    }
    sreach() {
        this.page = 1;
        this.articles.list = [];
        this.getArticlesByTitle();
    }
    onScrollDown() {
        if (this.page < 10) {
            ++this.page;
            this.getArticlesByTitle();
        }
    }
    getArticlesByTitle() {
        this.NewService.getArticlesByTitle(
            "",
            this.searchControl.value,
            this.page
        ).subscribe((data: any) => {
            const article = data.data.rows;
            this.articles.list = [...this.articles.list, ...article];
            this.articles.count = data.data.count;
            console.log(this.articles);
        });
    }
    handleImageError(event: any) {
        const fallbackImage =
            "https://nic.gov.vn/wp-content/plugins/elementor/assets/images/placeholder.png";
        this.renderer.setAttribute(event.target, "src", fallbackImage);
    }
}
