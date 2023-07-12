import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from 'src/app/modules/news/services/category.service';

@Component({
      selector: 'app-create-category',
      templateUrl: './create-category.component.html',
      styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent {
      formGroup: any;
      constructor(
            private formBuilder: FormBuilder,
            public CategoryService: CategoryService
      ) {
            this.formGroup = this.formBuilder.group({
                  name: '',
                  slug: '',
            });
      }
      submitForm(e: any) {
            console.log(this.formGroup.value);
            this.CategoryService.createCategory(
                  this.formGroup.value
            ).subscribe();
      }
}
