import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ["./app.component.scss"]
})

export class AppComponent {
  isLoggedIn: boolean = false;

  constructor(
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  async logout() {
    this.auth.logOut();
    this.isLoggedIn = false;
  }
}