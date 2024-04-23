import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { User, UserForm } from '../types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserIdFromLocalStorage(): number | null {
    const userIdString = localStorage.getItem('userId');
    if (userIdString) {
      return parseInt(userIdString);
    } else {
      return null;
    }
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`/user`).pipe(tap(users => console.log(users)));
  }

  // Vérification pour l'email de l'utilisateur (voir s'il exsite déjà en base au moment de la création de compte)
  emailExists(email: string): Observable<boolean> {
    return this.http.get<User[]>('/user').pipe(
      map(users => users.some(user => user.email === email))
    );
  }
  
  async addUser(user: UserForm) {
    const newUser = await this.http.post<User>("/user", user).toPromise();
    if (!newUser) throw new Error("Projet non créé.");
  }

}