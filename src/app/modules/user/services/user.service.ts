import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  inforUser: any;
  getTokenGG(id: string) {
    return this.http.get(environment.API_TOKEN_GG + id);
  }
  getDataInforUser() {
    this.http.get(environment.API_GET_INFOR_USER).subscribe((data: any) => {
      this.inforUser = data.user;
    });
  }
}
