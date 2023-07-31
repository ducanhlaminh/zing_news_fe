import { Component, Inject } from '@angular/core';
import {
      MAT_DIALOG_DATA,
      MatDialog,
      MatDialogRef,
} from '@angular/material/dialog';
import { CreatePostContentComponent } from '../admin/create-post-content/create-post-content.component';

@Component({
      selector: 'app-dialog-edit-article',
      templateUrl: './dialog-edit-article.component.html',
      styleUrls: ['./dialog-edit-article.component.scss'],
})
export class DialogEditArticleComponent {
      constructor(
            public dialogRef: MatDialogRef<CreatePostContentComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any
      ) {
            console.log(data);
      }
}
