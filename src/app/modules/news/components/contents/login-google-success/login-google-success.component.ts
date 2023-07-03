import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserService } from '../../../services/user.service';
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
  ngOnInit() {
    console.log(1);
    this.activatedRoute.params.subscribe((params: any) => {
      const code = params['code'];
      this.AuthService.getTokenGG(code).subscribe((data: any) => {
        localStorage.setItem('token', data.token);
        this.router.navigateByUrl('/trang-chu');
      });
    });
  }
}
