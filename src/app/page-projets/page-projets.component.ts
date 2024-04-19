import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetsService } from '../projets.service';

@Component({
  selector: 'app-page-projets',
  template: `
   
   <div>
    <p *ngIf = "username">welcome, {{username}}</p>
   </div>

   <div>
      <!-- quand la personne login n'a pas de projet, on lui invite de creer un nouveau projet -->
    <p *ngIf="!projets || projets.length === 0">
      <app-button [title]="title" (click)="create()"></app-button>
    </p>
</div>

     <div>
    <div *ngFor="let projet of projets">
      <p>{{ projet.name }}</p>
    <div>     
      <app-button [title]="title2" (click)="update(projet.id)"></app-button>
      <app-button [title]="title3" (click)="delete(projet.id)"></app-button>  
    </div>
    </div>

    <div>
      <p>Je voudrais ajouter encore nouveau projet</p>
      <app-button [title]="title" (click)="create()"></app-button>

    </div>
  `,
  styles: [
  ]
})
export class PageProjetsComponent implements OnInit {
  title: string = "create new projet";
  title2: string = "modifier";
  title3: string = "supprimer";
  username: string = "Ivan";
  projets: any[] = []
  constructor(private router:Router,
    private projetService: ProjetsService
  ) { }

  ngOnInit(): void {
    this.projets = this.projetService.getProjets();
  }

  create():void {
this.router.navigate(['/formulaire-projet'])
  }

  update(id: number):void {
    this.router.navigate(['/formulaire-projet', id])
  }

  delete(projectId: number): void {
    if (confirm("Are you sure you want to delete this project?")) {
      this.projetService.deleteProject(projectId);
      this.projets = this.projets.filter(projet => projet.id !== projectId);
    }
  }

  viewTasks(id:number):void{
    this.router.navigate(['/tasks',id]);
  }

}
