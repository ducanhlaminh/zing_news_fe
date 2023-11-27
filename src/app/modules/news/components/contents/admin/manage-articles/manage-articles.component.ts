import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
    faCircleMinus,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { NewsService } from "src/app/modules/news/services/news.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoryService } from "src/app/modules/news/services/category.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogEditArticleComponent } from "../../dialog-edit-article/dialog-edit-article.component";
import { configRole } from "src/environments/environment.development";
import { UserService } from "src/app/modules/news/services/user.service";
import { DialogComponent } from "../dialogs/dialog/dialog.component";
import { Category, Article } from "src/app/modules/news/interfaces/news";
import { ToastrCommonService } from "src/app/modules/news/services/toastr.service";
@Component({
    selector: "app-manage-articles",
    templateUrl: "./manage-articles.component.html",
    styleUrls: ["./manage-articles.component.scss"],
})
export class ManageArticlesComponent implements OnInit {
    @ViewChild("checkAll") checkAll!: ElementRef;
    configRole = configRole;
    faXmarkCircle = faCircleMinus;
    faMagnifyingGlass = faMagnifyingGlass;

    formFilter!: FormGroup;
    formEdit!: FormGroup;
    coloumnForm!: FormGroup;
    articles: Article[] = [];
    optionCategories: Category[] = [];
    selectedStatus: number = 1; // add css to button filter
    selectedAction: string = "1";
    listArticles: any[] = [];
    selectName: any;
    inforUser: any;
    configUser: any;
    showConfig: boolean = false;
    coloumns: any = {};

    length = 100;
    pageSize = 12;
    pageIndex = 0;
    loading = false;

    order: any = [];
    queries: any = {};
    statusOptions = [
        {
            name: "Xuất bản",
            status: 1,
        },
        { name: "Bản nháp", status: 0 },
    ];
    constructor(
        private NewService: NewsService,
        private CategoryService: CategoryService,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private toastr: ToastrCommonService,
        private UserService: UserService
    ) {}
    ngOnInit(): void {
        if (this.order.length > 0) this.queries.order = this.order;
        this.queries.page = this.pageIndex + 1;
        this.CategoryService.getAllCategoriesByAd({});
        this.getOptionCategories();
        this.formFilter = this.formBuilder.group({
            title: null,
            category_id: "",
            status: null,
        });

        this.UserService.inforUser$.subscribe((data) => {
            this.inforUser = data.user;
            this.configUser = this.configRole.find(
                (role: any) => role?.role_id === this.inforUser?.role_id
            );
            Object.keys(this.configUser?.coloumns).map(
                (key) => (this.coloumns[key] = true)
            );
            this.coloumnForm = this.formBuilder.group({
                ...this.coloumns,
                rows: this.pageSize,
            });
            this.getArticles();
        });
    }
    changeFilter(value: number) {
        this.pageIndex = 0;
        if (value === 1) {
            this.formFilter.patchValue({
                status: null,
            });
            this.selectedStatus = 1;
        } else if (value === 2) {
            this.formFilter.patchValue({
                status: 1,
            });
            this.selectedStatus = 2;
        } else {
            this.formFilter.patchValue({
                status: 0,
            });
            this.selectedStatus = 3;
        }
        this.getArticles();
    }
    saveConfig() {
        this.pageSize = this.coloumnForm.value.rows;
        this.coloumns = this.coloumnForm.value;
        this.getArticles();
    }
    changeSelected() {
        this.listArticles = [];
        this.articles.map((article: any) => {
            if (article.selected === true) {
                this.listArticles.push(article);
            }
        });
    }
    checkShowColoumns(type: string) {
        return this.configUser.coloumns.some(
            (coloumn: any) => coloumn === type
        );
    }
    getArticles() {
        this.queries.page = this.pageIndex + 1;
        for (var key in this.formFilter.value) {
            if (this.formFilter.value[key] === null) {
                delete this.formFilter.value[key];
            }
        }
        if (this.selectName) {
            this.queries.created_user_id = this.selectName?.id;
        } else {
            delete this.queries.created_user_id;
        }

        this.NewService.getAllByAd({
            ...this.queries,
            ...this.formFilter.value,
            limit: this.coloumnForm.value.rows,
        }).subscribe((data: any) => {
            this.articles = data.rows;
            this.articles.map((article: any) => {
                article.selected = false;
                article.edit = false;
            });
            this.length = data.count;
        });
    }
    checkAllFn(event: any): void {
        this.listArticles = [];
        this.articles.map((article: any) => {
            article.selected = event.target.checked;
            this.listArticles.push(article);
        });
    }
    search() {
        this.pageIndex = 0;
        this.getArticles();
    }
    actionFn(value: any) {
        this.pageIndex = 0;
        if (value === "2") {
            this.showDialogComfirm({
                articles: this.listArticles,
                type: 1,
            });
        } else if (value === "3" || value === "4") {
            this.loading = true;
            const listIdArticles = this.listArticles.map(
                (article: Article) => article.id
            );
            let status = 1;
            if (value === "4") {
                status = 0;
            }
            this.NewService.updateArticle({ status }, listIdArticles).subscribe(
                (data: any) => {
                    this.getArticles();
                    this.toastr.showToart(true, data.message);
                    this.loading = false;
                    this.listArticles = [];
                    this.checkAll.nativeElement.checked = false;
                }
            );
        }
    }
    deleteItem(item: any) {
        this.showDialogComfirm({ articles: [item], type: 1 });
    }
    getOptionCategories() {
        this.CategoryService.categoriesForAd$.subscribe((data) => {
            this.optionCategories = data?.categories;
        });
    }
    updateArticles(item: any) {
        this.loading = true;
        let listArticles: any[] = [];
        listArticles.push(item.id);
        this.NewService.updateArticle(null, listArticles).subscribe(
            (data: any) => {
                this.getArticles();
                this.getArticles(), this.toastr.showToart(true, data.message);
                this.loading = false;
            }
        );
    }
    handlePageEvent(e: any) {
        this.length = e.length;
        this.pageSize = e.pageSize;
        this.pageIndex = e.pageIndex;
        if (this.order.length > 0)
            this.queries.order = JSON.stringify(this.order);
        this.queries.page = this.pageIndex + 1;
        this.getArticles();
    }

    openDialog(data: any): void {
        const dialogRef = this.dialog.open(DialogEditArticleComponent, {
            width: "1900px",
            // height: '700px',
            data,
        });
        dialogRef.afterClosed().subscribe(() => this.getArticles());
    }
    showDialogComfirm(data: any) {
        const dialogRef = this.dialog.open(DialogComponent, {
            data,
        });
        dialogRef.afterClosed().subscribe(() => {
            console.log(data);

            data.msg && this.toastr.showToart(true, data.msg);
            this.listArticles = [];
            this.getArticles();
            this.checkAll.nativeElement.checked = false;
        });
    }
    close(id: number) {
        this.articles.map((article: any) => {
            if ((id = article.id)) {
                article.edit = false;
            }
        });
    }
    open(item: any) {
        this.articles.map((article: any) => {
            article.edit = false;
        });
        item.edit = true;
        let category;

        if (item.new_articles_categories.length === 1) {
            category = item.new_articles_categories[0].category.id;
        }
        item.new_articles_categories.map((item: any) => {
            if (item.category.parent_id !== null) {
                category = item.category.id;
            }
        });
        this.formEdit = this.formBuilder.group({
            title: item.title,
            category_id: category,
            status: item.status,
            slug: item.slug,
        });
    }
    submitUpdate(id: number) {
        this.loading = true;
        this.NewService.updateArticle(this.formEdit.value, id).subscribe(
            (data: any) => {
                this.getArticles(), this.toastr.showToart(true, data.message);
                this.loading = false;
            }
        );
    }
    viewDetail(item: any) {
        window.open(
            `http://localhost:4200/bai-viet/${item.slug}/${item.slug_crc}`,
            "_blank"
        );
    }
}
