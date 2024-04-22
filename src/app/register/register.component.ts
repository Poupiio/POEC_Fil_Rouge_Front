import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: "register.component.html",
  styleUrls: [ "../login/login.component.scss" ]
})
export class RegisterComponent implements OnInit {
  name: string = "";
  email: string = "";
  password: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  async register() {
    
  }
}
