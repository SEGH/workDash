import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserData } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthenticationService, private router: Router) { }

  user: UserData = {
    username: "",
    password: ""
  }

  login() {
    console.log(this.user);
    this.authService.loginUser(this.user).subscribe(
      () => {
        this.router.navigateByUrl("/dashboard");
      }
    );
  }
}
