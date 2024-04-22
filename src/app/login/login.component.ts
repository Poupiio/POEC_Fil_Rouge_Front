import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: "login.component.html",
  styleUrls: [ "login.component.scss" ]
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(
    private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
  }

  async login() {
    const res = await this.auth.login(this.email, this.password);

    if (typeof res === "string") {
      alert("Email ou mot de passe invalide");
    } else {
      this.email = "";
      this.password = "";
      this.router.navigate(['/']);
    }
  }

  // async logout() {

  // }
}
