import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-projets',
  template: `
    <p>
      Liste des projets
    </p>

    <div>
      <app-button [title]="title" (onclick)="save"></app-button>
      <app-button [title]="title2" (onclick)="update"></app-button>
      <app-button [title]="title3" (onclick)="delete"></app-button>
   
    </div>
  `,
  styles: [
  ]
})
export class PageProjetsComponent implements OnInit {
  title: string = "sauvegarder";
  title2: string = "modifier";
  title3: string = "supprimer";
  constructor() { }

  ngOnInit(): void {
  }

  save():void {

  }

  update():void {

  }

  delete():void {
    
  }

}
