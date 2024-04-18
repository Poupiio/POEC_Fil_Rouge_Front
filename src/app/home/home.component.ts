import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <app-button [title]="title" (onclick)="onClickMe()">
  </app-button>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  title:string="Créer mon projet";

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onClickMe():void {
    alert('reussi');
    this.router.navigate(['/login']);
  }

}
