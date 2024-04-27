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

  async login(email: string, password: string) {
    try {
      await this.auth.login(email, password);

    // if (typeof res === "string") {
    //   alert("Email ou mot de passe invalide");
    // } else {
    //   this.email = "";
    //   this.password = "";
    //   this.router.navigate(['/project']);
    // }
    } catch(error) {
      console.error("Une erreur s'est produite lors de la connexion", error);
    }
  }

  async logout() {
    await this.auth.logOut();
  }
}
