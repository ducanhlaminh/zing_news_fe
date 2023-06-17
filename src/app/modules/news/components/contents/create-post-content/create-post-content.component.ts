import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-create-post-content',
  templateUrl: './create-post-content.component.html',
  styleUrls: ['./create-post-content.component.scss'],
})
export class CreatePostContentComponent {
  plugin = 'fullscreen';
  dataModel: any;
  onClick() {
    console.log(this.dataModel);
  }
}
