import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from 'src/app/modules/news/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
      selector: 'app-create-category',
      templateUrl: './create-category.component.html',
      styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent {
      formGroup: any;
      constructor(
            private formBuilder: FormBuilder,
            public CategoryService: CategoryService,
            private toastr: ToastrService
      ) {
            this.formGroup = this.formBuilder.group({
                  name: '',
                  slug: '',
            });
      }
      submitForm(e: any) {
            this.CategoryService.createCategory(this.formGroup.value).subscribe(
                  () => this.showSuccess()
            );
      }
      showSuccess() {
            this.toastr.success('Hello world!', 'Toastr fun!');
      }
}
