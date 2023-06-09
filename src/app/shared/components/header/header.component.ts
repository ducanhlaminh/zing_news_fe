import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CategoryService } from '../../../modules/news/services/category.service';
import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/news/services/user.service';
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
      searchControl: FormControl = new FormControl();
      inforUser: any;
      @ViewChild('searchBtn') searchBtn: any;
      @ViewChild('input') input: any;
      constructor(
            public CategoryService: CategoryService,
            private Router: Router,
            public UserService: UserService
      ) {}
      ngOnInit(): void {
            this.getCategories();
            this.UserService.inforUser$.subscribe(
                  (data) => (this.inforUser = data)
            );
      }
      getCategories() {
            this.CategoryService.getAllCategories().subscribe(
                  (data: any) => (this.CategoryService.categories = data.rows)
            );
      }
      toogleInput() {
            this.input.nativeElement.style.display = 'block';

            if (this.input.nativeElement.style.display === 'block') {
                  if (this.searchControl.value) {
                        console.log(this.searchControl.value);
                        this.Router.navigate(['tim-kiem'], {
                              queryParams: { title: this.searchControl.value },
                        });
                  }
            } else {
                  this.input.nativeElement.focus();
            }
      }
      blurInput() {
            this.input.nativeElement.style.display = 'none';
      }
      clickLogo() {
            this.Router.navigateByUrl('/trang-chu');
      }
      signIn() {
            location.assign('http://localhost:4000/api/v1/auth/google');
      }
      signOut() {
            localStorage.removeItem('token');
            window.location.reload();
      }
      navigateToAdmin() {
            this.Router.navigateByUrl('/admin/tao-bai-viet');
      }
}
