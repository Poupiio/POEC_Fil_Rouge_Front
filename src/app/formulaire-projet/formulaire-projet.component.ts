import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetsService } from '../projets.service';

@Component({
  selector: 'app-formulaire-projet',
  template: `
    <form #loginForm = "ngForm">
  <div class="form-group">
    <label for="projet_name">Projet name</label>
    <input type="text" class="form-control" id="projet_name" [(ngModel)]="projet_name" name = "projet_name" placeholder="Enter your projet name">
   
  </div>
  <div class="form-group">
    <label for="projet_description">Projet description(ici notre backend n'a pas cette colone )</label>
    <input type="text" class="form-control" id="projet_description" aria-describedby="emailHelp" placeholder="Enter your description of projet">

    </div>
    <app-button [title]= "title" (click)="save()"></app-button>
    <app-button [title]= "title2" (click)="retour()"></app-button>
</form>
  `,
  styles: [
  ]
})
export class FormulaireProjetComponent implements OnInit {
  title: string = "save";
  title2: string = "retour";
  projet_name: string = "projet1";
  constructor(private router:Router,
    private projetService: ProjetsService
  ) { }

  ngOnInit(): void {
  }
  save(): void {
    const projet = {name : this.projet_name};
    this.projetService.addProjet(projet);
    alert("reussi de sauvegarder");
    this.router.navigate(['/page-projets']);
  }
  retour(): void {
    this.router.navigate(['/page-projets']);
  }

}
