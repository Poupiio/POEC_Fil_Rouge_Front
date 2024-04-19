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
</div>

    <p *ngIf = "loggedInUserName"> Welcome, {{loggedInUserName}}</p>
    <app-button [title]="title" [loading]= "isloading" (onclick)="onClickMe()">
  </app-button>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  title:string="Créer mon projet";
  loggedInUserName: string = "";
  isloading: boolean=false;

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onClickMe():void {
    alert('reussi');
    
    this.router.navigate(['/login']);

  }

 /* login():void {
    this.isloading=true;
    setTimeout(()=>{
      this.isloading=false; 
      
      this.router.navigate(['/login']);
    },2000);
    
  }*/

}
