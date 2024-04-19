import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


import { PageProjetsComponent } from './page-projets/page-projets.component';
import { FormulaireProjetComponent } from './formulaire-projet/formulaire-projet.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path : 'login', component:LoginComponent},
  { path : 'page-projets', component:PageProjetsComponent},
  { path : 'formulaire-projet',component:FormulaireProjetComponent},
  { path: 'formulaire-projet/:id', component: FormulaireProjetComponent }, 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
