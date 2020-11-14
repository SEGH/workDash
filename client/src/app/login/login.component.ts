import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserData } from "../authentication.service";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthenticationService) { }

  user: UserData = {
    username: "",
    password: ""
  }

  login() {
    console.log(this.user);
    this.authService.loginUser(this.user).subscribe();
  }
}
