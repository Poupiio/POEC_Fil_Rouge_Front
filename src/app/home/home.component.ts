import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
  <div>
    <p>Bienvenue sur Trollé</p>
</div>

<div>
    <p>Trollé permet aux utilisateurs de créer des tableaux de projet personnalisables composés de listes et de cartes. Chaque tableau représente un projet ou une initiative, tandis que les listes représentent les étapes ou les phases du projet. Les cartes, quant à elles, représentent les tâches individuelles ou les éléments de travail à accomplir.</p>
</div>

<div>
    <p>déjà client?</p> 
    <app-button [title]="title2" (onclick)="login()"></app-button>
</div>

    <p *ngIf = "loggedInUserName"> Welcome, {{loggedInUserName}}</p>
    <app-button [title]="title" (onclick)="onClickMe()">
  </app-button>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  title:string="Créer mon projet";
  title2:string="Login";
  loggedInUserName: string = "";

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onClickMe():void {
    alert('reussi');
    this.router.navigate(['/login']);
  }

  login():void {
    this.router.navigate(['/login']);
  }

}
