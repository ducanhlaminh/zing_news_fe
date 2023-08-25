import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
      loading = false;
      categories: any;
      constructor(
            private formBuilder: FormBuilder,
            public CategoryService: CategoryService,
            private toastr: ToastrService
      ) {
            this.formGroup = this.formBuilder.group({
                  name: ['', Validators.required],
                  slug: ['', Validators.required],
                  parent_id: [''],
            });
      }
      ngOnInit(): void {
            this.getOptionCategories();
            this.CategoryService.categoriesForAd$.subscribe(
                  (categories) => (this.categories = categories)
            );
      }
      submitForm(e: any) {
            if (this.formGroup.valid) {
                  this.loading = true;
                  this.CategoryService.createCategory(
                        this.formGroup.value
                  ).subscribe(() => {
                        this.loading = false;
                        this.showToart(true);
                  });
            } else {
                  this.showToart(false);
            }
      }
      showToart(status: boolean) {
            if (status) {
                  this.toastr.success('Tạo chuyên mục thành công');
            } else {
                  this.toastr.error('Vùi long điền đủ các trường cần thiết');
            }
      }
      onChangeCate(e: any) {
            this.formGroup.patchValue({ categoryId: e.value });
      }
      getOptionCategories() {
            this.CategoryService.getAllCategoriesByAd();
      }
}
