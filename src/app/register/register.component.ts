import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable, tap } from 'rxjs';
import { User, UserForm } from '../types';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { FormControl, Validators } from '@angular/forms'; // Importez FormControl et Validators
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: "register.component.html",
  styleUrls: [ "/register.component.scss" ]
})
export class RegisterComponent implements OnInit {
  username: string = "";
  email: string = "";
  password: string = "";
  

  // Déclarez les contrôles de formulaire avec les validateurs requis
  usernameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6), passwordValidator()]);

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private auth: AuthService  
  ) { }

  ngOnInit(): void {
  }

  

  async register() {
    // Vérifiez si les champs du formulaire sont valides
    if (this.usernameControl.invalid || this.emailControl.invalid || this.passwordControl.invalid) {
      console.log("Le formulaire est invalide.");
      return;
    }

    // Vérifier d'abord si l'e-mail existe déjà
    const emailExists = await this.userService.emailExists(this.email).toPromise();

    // Si l'e-mail existe déjà, renvoyer une alerte à l'utilisateur et arrêter la fonction
    if (emailExists) {
      console.log("L'e-mail existe déjà en base de données.");
      // Gérer le cas où l'e-mail existe déjà, par exemple, afficher un message à l'utilisateur
      alert("L'adresse email existe déjà");
      return;
    }

    const newUser: UserForm = { 
      username: this.username,
      email: this.email,
      password: this.password
    };

    try {
      await this.userService.addUser(newUser);

      // Une fois que l'utilisateur est ajouté avec succès, connectez-le automatiquement
      await this.auth.login(this.email, this.password);

      this.router.navigate(['/']);
    } catch (error) {
      console.error("Une erreur s'est produite lors de la création de l'utilisateur.");
    }
  }

}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$/;
    const valid = passwordRegex.test(control.value);
    return valid ? null : { 'invalidPassword': true };
  };
}