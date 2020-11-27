import { Component } from '@angular/core';
import { AuthenticationService } from "./authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private authService: AuthenticationService, private router: Router) { }

  isLoggedIn: boolean;

  ngOnInit() {
    this.authService.getUser().subscribe(
      user => {
        if (user) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }
    )
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        console.log("logged out");
        this.isLoggedIn = false;
        this.router.navigateByUrl("/");
      }
    )
  }
}
