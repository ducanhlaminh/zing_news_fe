import { Component, ViewChild, OnInit } from '@angular/core';
import { NewsService } from 'src/app/modules/news/services/news.service';

@Component({
      selector: 'app-preview-content',
      templateUrl: './preview-content.component.html',
      styleUrls: ['./preview-content.component.scss'],
})
export class PreviewContentComponent implements OnInit {
      @ViewChild('contentPreview') contentTag: any;
      constructor(public NewService: NewsService) {}
      ngOnInit(): void {
            console.log(this.contentTag);
      }
}
