import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserData } from "../authentication.service";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthenticationService, private app: AppComponent) { }

  user: UserData = {
    username: "",
    password: "",
    id: ""
  }

  ngOnInit() {
    this.authService.getUser().subscribe(
      user => {
        this.user.username = user.username;
        this.user.id = user._id;
        console.log(`getting user ${this.user.id}`)
      },
      err => {
        console.error(err);
      }
    );
  }

}
