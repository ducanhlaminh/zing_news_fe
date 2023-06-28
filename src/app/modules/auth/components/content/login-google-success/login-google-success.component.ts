import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from 'src/app/modules/news/services/user.service';
@Component({
  selector: 'app-login-google-success',
  templateUrl: './login-google-success.component.html',
  styleUrls: ['./login-google-success.component.scss'],
})
export class LoginGoogleSuccessComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private AuthService: AuthService,
    private router: Router,
    private UserService: UserService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      const id = params['id'];
      this.AuthService.getTokenGG(id).subscribe((data: any) => {
        localStorage.setItem('token', data.token);
      });
    });
    setTimeout(() => {
      this.UserService.getDataInforUser();
      this.router.navigateByUrl('/trang-chu');
    }, 500);
  }
}
