import {
    CdkDragDrop,
    copyArrayItem,
    moveItemInArray,
    transferArrayItem,
} from "@angular/cdk/drag-drop";
import {
    Component,
    Renderer2,
    OnInit,
    ElementRef,
    ViewChild,
} from "@angular/core";
import { NewsService } from "src/app/modules/news/services/news.service";
import {
    faEllipsisVertical,
    faCaretDown,
    faCaretUp,
    faAngleDown,
    faAngleUp,
    faSort,
} from "@fortawesome/free-solid-svg-icons";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CategoryService } from "src/app/modules/news/services/category.service";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
@Component({
    selector: "app-manage-position-home",
    templateUrl: "./manage-position-home.component.html",
    styleUrls: ["./manage-position-home.component.scss"],
})
export class ManagePositionHomeComponent implements OnInit {
    selectedStatus = 1;
    @ViewChild("checkAll") checkAll!: ElementRef;
    typeLayout = "1";
    categories: any[] = [];
    formSearch!: FormGroup;
    formOption!: FormGroup;
    queries: any = { page: 1 };
    statusOptions = [
        {
            name: "Xuất bản",
            status: 1,
        },
        { name: "Bản nháp", status: 0 },
    ];
    listArticles: any;
    list: any[] = [
        {
            array: [],
        },
        { array: [] },
        {
            array: [],
        },
        {
            array: [],
        },
        {
            array: [],
        },
        {
            array: [],
        },
        { array: [] },
        { array: [] },
        { array: [] },
    ];
    constructor(
        public CategoryService: CategoryService,
        public dialog: MatDialog,
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private NewsService: NewsService,
        public renderer: Renderer2
    ) {}
    ngOnInit(): void {
        this.formSearch = this.formBuilder.group({
            title: "",
        });
        this.formOption = this.formBuilder.group({
            categories_id: "1",
        });
        this.getOptionCategories();
        this.getHotNews();
    }

    handleImageError(event: any) {
        const fallbackImage =
            "https://nic.gov.vn/wp-content/plugins/elementor/assets/images/placeholder.png";
        this.renderer.setAttribute(event.target, "src", fallbackImage);
    }

    drop(event: CdkDragDrop<string[]>) {
        try {
            transferArrayItem(
                event?.previousContainer.data,
                event?.container.data,
                event.previousIndex,
                event.previousIndex
            );
            console.log(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.previousIndex
            );
            console.log(event);
        } catch (error) {
            console.log(error);
        }
    }
    drop2(event: CdkDragDrop<string[]>, data: any) {
        try {
            this.list[data].array.length = 0;

            transferArrayItem(
                event?.previousContainer.data,
                event?.container.data,
                event.previousIndex,
                event.currentIndex
            );
            this.list[data].array[0].position = data + 1;
        } catch (error) {
            console.log(error);
        }
    }

    showToart(status: boolean) {
        if (status) {
            this.toastr.success("Cập nhật thành công");
        } else {
            this.toastr.error("Vùi long điền đủ các trường cần thiết");
        }
    }
    getHotNews() {
        if (this.formOption?.value?.categories_id !== "1") {
            this.typeLayout = "2";
            this.NewsService.getartclesHotCate(
                this.formOption.value?.categories_id
            ).subscribe((data: any) => {
                let array = data.hotArticlesCate.new_articles_hot_categories;

                this.list?.map((item: any, index: any) => {
                    const result = array.find(
                        (article: any) => article?.position === index + 1
                    );
                    if (!result) {
                        this.list[index].array[0] = {
                            article_id: null,
                            position: index + 1,
                            new_article: null,
                        };
                    } else {
                        this.list[index].array[0] = result;
                    }
                });
            });
            console.log(this.list);
        } else {
            this.typeLayout = "1";
            this.NewsService.getHotMain().subscribe((data: any) => {
                let array = data?.hot_news?.hot_main;

                this.list?.map((item: any, index: any) => {
                    const result = array.find(
                        (article: any) => article.position === index + 1
                    );
                    if (!result) {
                        this.list[index].array[0] = {
                            article_id: null,
                            position: index + 1,
                            new_article: null,
                        };
                    } else {
                        this.list[index].array[0] = result;
                    }
                });
                console.log(this.list);
            });
        }
    }
    getArticles() {
        this.NewsService.getAllByAd(this.formSearch.value).subscribe(
            (data: any) => {
                let array: any = [];
                data.rows.map((item: any) => {
                    array.push({
                        article_id: item.id,
                        position: null,
                        new_article: item,
                    });
                });

                this.listArticles = array;
            }
        );
    }
    getOptionCategories() {
        this.CategoryService.categoriesForAd$.subscribe(
            (data: any) => (this.categories = data?.categories)
        );
    }
    updatePosition() {
        console.log(this.list);
        if (this.formOption.value.categories_id === "1") {
            let data: any = [];
            this.list.map((item: any) => {
                if (item.array[0].article_id) {
                    data.push({
                        article_id: item.array[0].article_id,
                        position: item.array[0].position,
                    });
                }
            });
            this.NewsService.updateHotMain(data).subscribe();
        } else {
            let data: any = [];
            this.list.map((item: any) => {
                if (item.array[0].article_id) {
                    data.push({
                        article_id: item.array[0].article_id,
                        position: item.array[0].position,
                    });
                }
            });
            const cate = this.categories.find(
                (category: any) =>
                    category.slug_crc ===
                    parseInt(this.formOption.value.categories_id)
            );
            this.NewsService.updateArtclesHotCate(data, cate.id).subscribe();
        }
    }
    close(number: any) {
        this.list[number].array.length = 0;
        this.list[number].array[0] = {
            article_id: null,
            position: number + 1,
            new_article: null,
        };
        console.log(this.list);
    }
}
