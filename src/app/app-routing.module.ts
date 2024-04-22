import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { UpdateTaskComponent } from './updatetask/updatetask.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "project", component: ProjectComponent, canActivate: [AuthGuard] },
  { path: "task/add", component: TaskComponent, canActivate: [AuthGuard] },
  { path: "task/update/:projectId/:taskId", component: UpdateTaskComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "user", component: UserComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
