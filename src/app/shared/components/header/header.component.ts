import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { CategoryService } from '../../../modules/news/services/category.service';
import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  categories: any;
  faMagnifyingGlass = faMagnifyingGlass;
  faUser = faUser;
  showInput = false;
  @ViewChild('searchBtn') searchBtn: any;
  @ViewChild('input') input: any;
  constructor(public CategoryService: CategoryService) {}
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.CategoryService.getAllCategories().subscribe(
      (data: any) => (this.CategoryService.categories = data.categories)
    );
  }
  toogleInput() {
    this.input.nativeElement.style.display = 'block';

    if (this.input.nativeElement.style.display === 'block') {
    } else {
      this.input.nativeElement.focus();
    }
  }
  blurInput() {
    this.input.nativeElement.style.display = 'none';
  }
}
