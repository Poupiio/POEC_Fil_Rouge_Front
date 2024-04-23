import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { UpdateTaskComponent } from './updatetask/updatetask.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importez FormsModule et ReactiveFormsModule
import { SortableModule } from 'ngx-bootstrap/sortable';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MyhttpService } from 'myhttp.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectComponent,
    TaskComponent,
    UpdateTaskComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    SortableModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: MyhttpService,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
