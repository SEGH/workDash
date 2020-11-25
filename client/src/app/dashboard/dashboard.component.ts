import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserData } from "../authentication.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  user: UserData = {
    username: "",
    password: ""
  }

  ngOnInit() {
    this.authService.getUser().subscribe(
      user => {
        this.user.username = user.username;
      },
      err => {
        console.error(err);
      }
    );
  }

}
