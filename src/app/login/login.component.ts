import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
  <div>
   <form #loginForm = "ngForm">
  <div class="form-group">
    <label for="email">Email address</label>
    <input type="email" class="form-control" [(ngModel)]="email" name = "email" id="email" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" class="form-control" [(ngModel)]= "password" name = "password" id="password" placeholder="Password">
  </div>
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
 
</form>
<app-button [title]= "title" (click)="login()"></app-button>
</div>
  `,
  styles: [
  ]
})
export class LoginComponent implements OnInit {
email: string = "";
password: string ="";
title: string = "login";
  constructor() { }

  ngOnInit(): void {
  }

  login():void {}

}
