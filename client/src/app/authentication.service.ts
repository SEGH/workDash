import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserData {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http: HttpClient) { }

  // loginUser(user) {
  //   return this.http.post(`http://localhost:3001/api/users/login`, user).toPromise();
  // }
  private request(
    method: "post",
    type: "login",
    user: UserData
  ): Observable<any> {
    return this.http.post(`api/users/login`, user);
  }

  public loginUser(user: UserData): Observable<any> {
    return this.request("post", "login", user);
  }
}
