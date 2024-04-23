import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './types';
import { BehaviorSubject, Observable } from 'rxjs';

type LoginResponse = {
  token: string
} | string;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string | null = null;
  user: User | null = null;
  userId?: number;

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { 
    this.loginFromLocalStorage();
  }

  // Connexion automatique
  private async loginFromLocalStorage() {
    const token = localStorage.getItem("token");

    if (!token) return;

    this.token = token;
    
    const payload = this.token.split(".")[1];
    const decoded = atob(payload);
    const user = JSON.parse(decoded) as User;
    this.user = user;

    return user;
  }

  async login(email: string, password: string) : Promise<User | string> {
    try {
      const res = await this.http.post<LoginResponse>("/user/login", {
        email,
        password
      }).toPromise();
 
      if (typeof res === "string" || !res)
        throw new Error(res);

      
      const payload = res.token.split(".")[1];
      const decoded = atob(payload);
      const user = JSON.parse(decoded) as User;

      // Récupération de l'id du user pour le stocker dans le LS
      this.userId = user.id;
      localStorage.setItem("userId", this.userId.toString());
      
      this.token = res.token;
      this.user = user;
      
      localStorage.setItem("token", this.token);
      this.isLoggedInSubject.next(true);
      
      return user;
      
    } catch (e: any) {
      if (e instanceof HttpErrorResponse) {
        return e.error;
      } else {
        return "OH NO! An error has occured :(";
      }
    }
  }

  async logOut() {
    localStorage.clear();
    this.token = "";
    this.user = null;
    this.userId = undefined;
    this.isLoggedInSubject.next(false);
  }

}
