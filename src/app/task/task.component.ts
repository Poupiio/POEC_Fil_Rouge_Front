import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskStatus, TaskForm, TaskToDisplay, Task } from "../types";
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { ProjectService } from '../services/project.service';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-task',
  templateUrl: "./task.component.html",
  styleUrls: [ "./task.component.scss"
  ]
})
export class TaskComponent implements OnInit {
  title: string = "";
  description: string ="";
  status: TaskStatus = TaskStatus.TO_DO;
  estimation: number = 1;
  projectId: number = 1;

  tasks: Task[] = [];
  todo: TaskToDisplay[] = [];
  ongoing: TaskToDisplay[] = [];
  done: TaskToDisplay[] = [];
  
  constructor(
    private router: Router,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private authGuard: AuthGuard
  ) { }


  getProjectTasks(projectId: number) {
    this.taskService.getAllTasks(projectId).subscribe(res => {
      this.tasks = res;
    });
  }

  async submit(): Promise<void> {
    const newTask: TaskForm = {
      title: this.title,
      description: this.description,
      status: this.status,
      estimationHours: this.estimation,
      projectId: this.projectId
    }
    
    try {
      await this.taskService.addTask(this.projectId, newTask);
  
      // Mise à jour des tâches après avoir ajouté une nouvelle tâche
      await this.getProjectTasks(this.projectId);
      
      // Redirection vers la page du projet avec l'ID du projet
      this.router.navigate(['/project'], { queryParams: { projectId: this.projectId } });
    } catch (error) {
      console.error("Une erreur s'est produite lors de l'ajout de la tâche :", error);
    }
  }

  goBack() {
    this.router.navigate(['/project'], { queryParams: { projectId: this.projectId } });
  }

  ngOnInit(): void {
    // Récupération de l'id du projet passé en paramètre URL
    this.route.queryParams.subscribe(params => {
      // Utilisation de l'opérateur unaire = +params pour convertir la string récupérée dans les params en nombre
      this.projectId = +params['projectId'];
    });
  }

}
