import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { ButtonComponent } from './button/button.component';


import { PageProjetsComponent } from './page-projets/page-projets.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProjetsListComponent } from './projets-list/projets-list.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { FormulaireProjetComponent } from './formulaire-projet/formulaire-projet.component';
import { SortableModule } from 'ngx-bootstrap/sortable';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    UserComponent,
    RegisterComponent,
    ButtonComponent,
 

    PageProjetsComponent,
    TasksComponent,
    ProjetsListComponent,
    LoginComponent,
    FormulaireProjetComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    SortableModule.forRoot(),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
