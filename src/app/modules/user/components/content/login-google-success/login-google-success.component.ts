import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-login-google-success',
  templateUrl: './login-google-success.component.html',
  styleUrls: ['./login-google-success.component.scss'],
})
export class LoginGoogleSuccessComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private UserService: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      const id = params['id'];
      this.UserService.getTokenGG(id).subscribe((data: any) => {
        localStorage.setItem('token', data.token);
      });
    });
    setTimeout(() => {
      this.UserService.getDataInforUser();
    }, 1000);
    this.router.navigateByUrl('/trang-chu');
  }
}
