import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  inforUser$ = new BehaviorSubject<any>({});
  user: any;
  getDataInforUser() {
    this.http.get(environment.API_GET_INFOR_USER).subscribe((data: any) => {
      this.inforUser$.next(data);
    });
  }
}
