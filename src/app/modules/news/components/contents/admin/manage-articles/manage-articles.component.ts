import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
    faEllipsisVertical,
    faCaretDown,
    faCaretUp,
    faXmark,
    faEdit,
    faCircleInfo,
    faSort,
    faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";

import { NewsService } from "src/app/modules/news/services/news.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoryService } from "src/app/modules/news/services/category.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogEditArticleComponent } from "../../dialog-edit-article/dialog-edit-article.component";
import { ToastrService } from "ngx-toastr";
import { configRole } from "src/environments/environment.development";
import { UserService } from "src/app/modules/news/services/user.service";
import { DialogComponent } from "../dialogs/dialog/dialog.component";
@Component({
    selector: "app-manage-articles",
    templateUrl: "./manage-articles.component.html",
    styleUrls: ["./manage-articles.component.scss"],
})
export class ManageArticlesComponent implements OnInit {
    @ViewChild("checkAll") checkAll!: ElementRef;
    configRole = configRole;
    faEllipsisVertical = faEllipsisVertical;
    faCaretDown = faCaretDown;
    faCaretUp = faCaretUp;
    faXmark = faXmark;
    faEdit = faEdit;
    faCircleInfo = faCircleInfo;
    faSort = faSort;
    faXmarkCircle = faCircleMinus;

    formFilter!: FormGroup;
    formEdit!: FormGroup;
    coloumnForm!: FormGroup;
    articles: any = [];
    selectQuickEdit: any;
    optionCategories: any = [];
    updateHotCate: any = true;
    filters: any;
    selectedStatus = 1;
    selectedAction: string = "1";
    listArticles: any[] = [];
    selectName: any;
    inforUser: any;
    configUser: any;
    showConfig: boolean = false;
    coloumns: any = {};

    length = 100;
    pageSize = 10;
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
        private toastr: ToastrService,
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

        this.getArticles();
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

            console.log(this.coloumns, {
                ...this.configUser?.coloumns,
                rows: this.pageSize,
            });
        });
    }
    saveConfig() {
        this.pageSize = this.coloumnForm.value.rows;
        this.coloumns = this.coloumnForm.value;
    }
    changeSelected() {
        this.listArticles = [];
        this.articles.map((article: any) => {
            if (article.selected === true) {
                this.listArticles.push(article);
            }
        });
    }
    showToart(status: boolean, title: string = "", detail = "") {
        if (status) {
            this.toastr.success(title, detail);
        } else {
            this.toastr.error(title, detail);
        }
    }
    checkShowColoumns(type: string) {
        return this.configUser.coloumns.some(
            (coloumn: any) => coloumn === type
        );
    }
    getArticles() {
        this.pageIndex = 0;
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
        console.log(this.queries);

        this.NewService.getAllByAd({
            ...this.queries,
            ...this.formFilter.value,
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
    actionFn(value: any) {
        if (value === "2") {
            this.showDialogComfirm({
                articles: this.listArticles,
                type: 1,
            });
        } else if (value === "3" || value === "4") {
            this.loading = true;
            let status = 1;
            if (value === "4") {
                status = 0;
            }
            this.NewService.updateArticle(
                { status },
                this.listArticles
            ).subscribe((data: any) => {
                this.getArticles();
                this.getArticles(), this.showToart(true, data.message);
                this.loading = false;
                this.listArticles = [];
                this.checkAll.nativeElement.checked = false;
            });
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
                this.getArticles(), this.showToart(true, data.message);
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
        this.NewService.getAllByAd({ ...this.queries }).subscribe(
            (data: any) => {
                this.articles = data.rows;
                this.length = data.count;
            }
        );
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

            data.msg && this.showToart(true, data.msg);
            this.listArticles = [];
            this.getArticles();
            this.checkAll.nativeElement.checked = false;
        });
    }
    close() {
        this.articles.map((article: any) => {
            if ((this.selectQuickEdit = article.id)) {
                article.edit = false;
            }
        });
    }
    open(item: any) {
        this.articles.map((article: any) => {
            article.edit = false;
        });
        item.edit = true;
        this.selectQuickEdit = item.id;
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
    submitUpdate() {
        this.loading = true;
        this.NewService.updateArticle(
            this.formEdit.value,
            this.selectQuickEdit
        ).subscribe((data: any) => {
            this.getArticles(), this.showToart(true, data.message);
            this.loading = false;
        });
    }
    viewDetail(item: any) {
        window.open(
            `http://localhost:4200/bai-viet/${item.slug}/${item.slug_crc}`,
            "_blank"
        );
    }
}
