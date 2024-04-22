import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
