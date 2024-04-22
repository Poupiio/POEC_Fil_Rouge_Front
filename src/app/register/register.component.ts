import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: "register.component.html",
  styleUrls: [ "/register.component.scss" ]
})
export class RegisterComponent implements OnInit {
  name: string = "";
  email: string = "";
  password: string = "";


  constructor(private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
  }

  async register() {
    const res = await this.auth.register(this.name, this.email, this.password);

    // Si la création de l'utilisateur a réussi, j'exécute la fonction de login() pour qu'il soit automatiquement connecté et puisse avoir accès aux pages protégées
    console.log(this.email, this.password);
    await this.auth.login(this.email, this.password);
    this.router.navigate(['/project']);
    
  }
}
