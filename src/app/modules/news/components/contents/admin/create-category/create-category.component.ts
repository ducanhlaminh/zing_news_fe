import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from 'src/app/modules/news/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
      selector: 'app-create-category',
      templateUrl: './create-category.component.html',
      styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
      formGroup: any;
      optionCategories: any;
      constructor(
            private formBuilder: FormBuilder,
            public CategoryService: CategoryService,
            private toastr: ToastrService
      ) {
            this.formGroup = this.formBuilder.group({
                  name: '',
                  slug: '',
                  categoryId: '',
            });
      }
      ngOnInit(): void {
            this.getOptionCategories();
      }
      submitForm(e: any) {
            this.CategoryService.createCategory(this.formGroup.value).subscribe(
                  () => this.showSuccess()
            );
      }
      showSuccess() {
            this.toastr.success('Hello world!', 'Toastr fun!');
      }
      onChangeCate(e: any) {
            this.formGroup.patchValue({ categoryId: e.value });
      }
      getOptionCategories() {
            this.CategoryService.getAllCategoriesByAd().subscribe(
                  (data: any) => {
                        this.CategoryService.categories = data.rows;
                        this.CategoryService.categories.map((item: any) => {
                              item.opened = false;
                        });
                        this.optionCategories = this.CategoryService.categories;
                  }
            );
      }
}
