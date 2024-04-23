import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, TaskStatus, TaskToDisplay, Task, ProjectForm, TaskForm } from '../types';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-project',
  templateUrl: "./project.component.html",
  styleUrls: [ "./project.component.scss" ]
})
export class ProjectComponent implements OnInit {
  isPageLoaded: boolean = false;

  pageTitle: string = "";
  selectedProjectTitle: string = "";
  
  projectName: string = "";
  currentProjectName?: string;
  updatedProjectName: string = "";
  offcanvasVisible: boolean = false;
  projects: Project[] = [];

  tasks: Task[] = [];
  todo: TaskToDisplay[] = [];
  ongoing: TaskToDisplay[] = [];
  done: TaskToDisplay[] = [];

  updateForm: boolean = false;
  addForm: boolean = false;
  selectedProjectId: number = 1;

  // Affichage du formulaire de création de tâche
  projectId: number = 1;

  userId: number = parseInt(localStorage.getItem('userId')!);

  title: string = "";
  description: string = "";
  status: TaskStatus = TaskStatus.TO_DO;
  estimation: number = 1;
  taskId: number = 1;
  
  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  // Gestion de l'affichage de la side bar
  toggleOffcanvas(): void {
    this.offcanvasVisible = !this.offcanvasVisible;
    const offcanvasElement = document.getElementById('myOffCanvas');
    if (this.offcanvasVisible) {
      offcanvasElement?.classList.add('show');
    } else {
      offcanvasElement?.classList.remove('show');
    }
  }

  // Fermeture de la side bar au clic sur un nom de projet
  closeOffcanvas(): void {
    this.offcanvasVisible = false;
    const offcanvasElement = document.getElementById('myOffCanvas');
    if (offcanvasElement) {
      offcanvasElement.classList.remove('show');
    }
  }

  // Passage du nom du projet au titre de la page
  updatePageTitle(projectName: string): void {
    this.pageTitle = projectName;
  }

  // Affichage du formulaire d'ajout de projet
  toggleAddForm(): void {
    this.addForm = !this.addForm;
    // Je masque le formulaire de modification
    this.updateForm = false;
  }

  // Affichage du formulaire de modification de projet
  toggleUpdateForm(projectId: number, projectName: string): void {
    this.selectedProjectId = projectId;
    this.updatedProjectName = projectName;
    this.updateForm = !this.updateForm;
    // Je masque le formulaire d'ajout
    this.addForm = false;
  }
  
  // Obtenir l'id du projet cliqué : je me sers de cette fonction pour récupérer le nom du projet pour l'afficher par la suite
  async getProjectById(projectId: number) {
    this.projectId = projectId;
    try {
      const project = await this.projectService.getProjectById(projectId).toPromise();
      this.currentProjectName = project?.name;
    } catch (error) {
      console.error('Erreur lors de la récupération du projet :', error);
    }
  }
  
  
  // Afficher tous les projets du user connecté
  async getProjects(userId: number) {

    this.projectService.getProjects(userId).subscribe(res => {
      this.projects = res;
    });
  }

  // Ajouter un projet
  async addProject() {
    // Données à envoyer au serveur
    const newProject: ProjectForm = { 
      name: this.projectName,
      userId: this.userId
     };

    try {
      await this.projectService.addProject(newProject);
      await this.getProjects(this.userId);
      
      // Je masque le formulaire d'ajout
      this.addForm = false;
      // Je vide le champ du formulaire
      this.projectName = "";
    } catch (error) {
      console.error("Une erreur s'est produite lors de la création du projet.");
    }
  }

  // Modifier un projet
  async editProject(projectId: number) {
    // Données à envoyer au serveur
    const updatedProjectName: ProjectForm = {
      name: this.updatedProjectName,
      userId: this.userId
    };

    try {
      this.projectService.updateProject(projectId, updatedProjectName);

      // Mettre à jour le nom du projet dans la liste
      // Je cherche l'index du projet dans la liste, et celui dont l'id matche avec l'id du projet modifié, je modifie le nom côté navigateur
      const index = this.projects.findIndex(project => project.id === projectId);
      if (index !== -1) {
        this.projects[index].name = this.updatedProjectName;
      }

      // Réinitialiser le nom du projet et de l'id sélectionné après la modification
      this.selectedProjectId = 1;
      this.updatedProjectName = "";
      // Masquage du formulaire de modification après la modification
      this.updateForm = false;
    } catch (error) {
        console.error("Une erreur est survenue lors de la modification");
    }
  }

  // Supprimer un projet
  async deleteProject(projectId: number) {
    try {
      await this.projectService.deleteProject(projectId);

      // Mise à jour de la liste sans avoir à refresh la page
      this.projects = this.projects.filter(projects => projects.id !== projectId);
      this.getProjects(this.userId);
    } catch (error) {
      console.error("Une erreur s'est produite lors de la suppression du projet", error);
    }
  }

  // Passage de l'id du projet en paramètre URL pour le récupérer sur la page du formulaire d'ajout de tâche
  onTaskAdding(projectId: number) {
    this.router.navigate(['/task/add'], { queryParams: { projectId: projectId } });
  }


  // Afficher les tâches d'un projet en fonction de son ID
  getProjectTasks(projectId: number): void {
    // Je récupère les tâches depuis la BDD
    this.taskService.getAllTasks(projectId).subscribe(res => {
      this.tasks = res;
    });
    
  }

  displayTasks(): void {
    this.taskService.getAllTasks(this.projectId);

    // Pour chaque colonne, je vais filtrer le tableau de tâches (tasks) par leur statut

    // COLONNE A FAIRE
    this.todo = this.tasks
      .filter(task => task.status === TaskStatus.TO_DO)
      .map(task => ({ title: task.title, id: task.id  }));

    // COLONNE EN COURS
    this.ongoing = this.tasks
      .filter(task => task.status === TaskStatus.ONGOING)
      .map(task => ({ title: task.title, id: task.id }));

    // COLONNE TERMINÉ
    this.done = this.tasks
      .filter(task => task.status === TaskStatus.DONE)
      .map(task => ({ title: task.title, id: task.id }));
  }

  updateTasksDisplay() {
    this.taskService.getAllTasks(this.projectId).subscribe(res => {
      this.tasks = res;

      // Puis je les dispatche dans les colonnes correspondant au statut de la tâche
      this.displayTasks();
    });
  }


  statusModal: string = ""; // Modifier le type de la variable pour qu'il soit de type string

  getTaskDetails(taskId: number) {
    try {
      this.taskService.getTaskById(this.projectId, taskId).subscribe(res => {
        this.title = res.title;
        this.description = res.description || "";
        this.estimation = res.estimationHours;
        this.statusModal = this.mapStatus(res.status);
      });
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des détails de la tâche", error);
    }
  }

  // Attribuer des valeurs en string pour chaque type de statut
  mapStatus(status: string): string {
    switch (status) {
      case TaskStatus.TO_DO:
        return "À faire";
      case TaskStatus.ONGOING:
        return "En cours";
      case TaskStatus.DONE:
        return "Terminé";
      default:
        return "Inconnu";
    }
  }
  // Redirection vers le formulaire de modification de tâche
  redirectUpdateForm(projectId: number, taskId: number) {
    this.router.navigate([`/task/update/${projectId}/${taskId}`]);
  }

  // Supprimer une tâche en fonction du projet sélectionné
  async deleteTask(projectId: number, taskId: number) {
    try {
      await this.taskService.deleteTask(projectId, taskId);

      // Mise à jour de la liste sans avoir à refresh la page
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.displayTasks();
    } catch (error) {
      console.error("Une erreur s'est produite lors de la suppression de la tâche", error);
    }
    
  }


  ngOnInit(): void {
    // Je récupère l'id du projet depuis les paramètres de l'URL
    this.route.queryParams.subscribe(params => {
      this.projectId = params['projectId'];
    });

    // Si projectId est défini, donc qu'un projet a été sélectionné, je displayTasks()
    if (this.projectId) {
      // 1 : Je récupère les détails du projet (son id + son nom)
      this.projectService.getProjectById(this.projectId)
        .subscribe(project => {
          if (project) {
            // Je mets à jour le titre de la page avec le nom du projet
            this.pageTitle = project.name;

            // J'affiche les tâches quand le projet est récupéré
            this.taskService.getAllTasks(this.projectId).subscribe(res => {
              this.tasks = res;
              this.displayTasks();
            });
          } else {
            console.log("Projet non trouvé.");
          }
        },
        error => {
          console.error('Erreur lors de la récupération du projet :', error);
        }
      );
    }

  }
}
