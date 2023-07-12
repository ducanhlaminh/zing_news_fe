import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from 'src/app/modules/news/services/category.service';
@Component({
      selector: 'app-dialog',
      standalone: true,
      imports: [CommonModule, MatButtonModule, MatDialogModule],
      templateUrl: './dialog.component.html',
      styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
      constructor(
            @Inject(MAT_DIALOG_DATA) public data: any,
            private CategoryService: CategoryService
      ) {}
      deleteCate(item: any) {
            this.CategoryService.deleteCategory(item.id).subscribe();
      }
}
