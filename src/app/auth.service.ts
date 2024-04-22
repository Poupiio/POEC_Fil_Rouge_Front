import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './types';
import { BehaviorSubject, Observable } from 'rxjs';

type LoginResponse = {
  accessToken: string
} | string;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  accessToken: string | null = null;
  user: User | null = null;

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { 
    this.loginFromLocalStorage();
  }

  // Connexion automatique
  private async loginFromLocalStorage() {
    const accessToken = localStorage.getItem("token");

    if (!accessToken) return;

    this.accessToken = accessToken;
    
    const payload = this.accessToken.split(".")[1];
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

      const payload = res.accessToken.split(".")[1];
      const decoded = atob(payload);
      const user = JSON.parse(decoded) as User;
      
      this.accessToken = res.accessToken;
      this.user = user;

      localStorage.setItem("token", this.accessToken);
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
    this.accessToken = "";
    this.user = null;
    this.isLoggedInSubject.next(false);
  }

}
