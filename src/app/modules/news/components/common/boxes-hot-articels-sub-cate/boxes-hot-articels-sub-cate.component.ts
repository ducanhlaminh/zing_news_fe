import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boxes-hot-articels-sub-cate',
  templateUrl: './boxes-hot-articels-sub-cate.component.html',
  styleUrls: ['./boxes-hot-articels-sub-cate.component.scss'],
})
export class BoxesHotArticelsSubCateComponent {
  @Input() hotArticlesSubCate: any[] = [];
}
