import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserData } from "../authentication.service";
import { Router } from "@angular/router";
import { AppComponent } from "../app.component";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthenticationService, private router: Router, private app: AppComponent) { }

  user: UserData = {
    username: "",
    password: "",
    id: ""
  }

  login() {
    console.log(this.user);
    this.authService.loginUser(this.user).subscribe(
      () => {
        this.app.isLoggedIn = true;
        this.router.navigateByUrl("/dashboard");
      }
    );
  }
}
