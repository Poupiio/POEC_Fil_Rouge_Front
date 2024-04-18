import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { PageProjetsComponent } from './page-projets/page-projets.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path : 'login', component:LoginComponent},
  { path : 'register', component:RegisterComponent},
  { path : 'drag-drop',component:DragDropComponent},
  { path : 'page-projets', component:PageProjetsComponent},
  { path : '**',redirectTo:'/home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
