import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserForm } from '../types';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: "./register.component.html",
  styleUrls: [ "../login/login.component.scss" ]
})
export class RegisterComponent implements OnInit {
  username: string = "";
  email: string = "";
  password: string = "";

  constructor(private router: Router,
    private userService: UserService,
    private auth: AuthService  
  ) { }
  
  async register(username: string, email: string, password: string) {

    // Je vérifie d'abord si l'utilisateur a bien remplié les champs lors de l'envoi des données
    if (!username || !email || !password) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    // Je vérifie d'abord si l'e-mail existe déjà en BDD
    const emailExists = await this.userService.emailExists(this.email).toPromise();
    
    // S'i existe, je renvoie une alerte à l'utilisateur et je stoppe la fonction
    if (emailExists) {
      alert("L'adresse email existe déjà");
      return;
    }
    
    const newUser: UserForm = { 
      username: username,
      email: email,
      password: password
    };
    
    try {
      await this.userService.addUser(newUser);
      
      // Quand la création de l'utilisateur a fonctionné, j'appelle la fonction login() pour que le navigateur le considère connecté et lui attribue un token
      await this.auth.login(email, password);
      
      this.router.navigate(['/project']);
    } catch (error) {
      console.error("Une erreur s'est produite lors de la création de l'utilisateur.");
    }
  }
  
  ngOnInit(): void {
  }

}