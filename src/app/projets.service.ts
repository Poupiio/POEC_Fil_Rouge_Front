import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjetsService {
  projets: any[] = [];
  

  constructor() { }

  getProjets(): any[]{
    return this.projets;
  }

  getProjetById(id: number):any {
    return this.projets.find(projet => projet.id === id);
  }

  addProjet(projet:any):void{
    this.projets.push(projet);
  }
//j'ai pas très compris cette function
  updateProjet(id:number, updatedProjet: any):void{
    const index = this.projets.findIndex(projet => projet.id === id);
    if (index !== -1){
      this.projets[index].name = updatedProjet.name;
    }
  }

  deleteProject(id:number):void{
    this.projets = this.projets.filter(projet => projet.id!== id);
  }
}
