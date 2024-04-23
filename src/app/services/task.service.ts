import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Task, TaskForm, TaskStatus } from '../types';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = [];

  constructor(
    private http: HttpClient
  ) { }

  // Afficher les tâches du projet
  getAllTasks(projectId: number) : Observable<Task[]> {
      return this.http.get<Task[]>(`/project/${projectId}/task`);
  }

  // Récupérer les détails d'une tâche
  getTaskById(projectId: number, taskId: number): Observable<Task> {
    return this.http.get<Task>(`/project/${projectId}/task/${taskId}`);
  }

  // Ajouter une tâche
  async addTask(projectId: number, task: TaskForm) {
    const newTask = await this.http.post<Task>(`/project/${projectId}/task/create`, task).toPromise();

    if (!newTask) throw new Error("Tâche non créée.");

    // Mise à jour de la liste des tâches depuis le serveur
    this.getAllTasks(projectId).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  // Modification d'une tâche
  async updateTask(projectId: number, taskId: number, task: TaskForm) {
    try {
      const updatedTask = await this.http.put<Task>(`/project/${projectId}/task/${taskId}`, task).toPromise();

      if (!updatedTask) throw new Error("Aucun projet à modifier");
  
      // Mise à jour de la liste des projets depuis le serveur
      this.getAllTasks(projectId).subscribe(tasks => {
        this.tasks = tasks;
        console.log(tasks);
      });

    } catch(error) {
      console.error("Une erreur s'est produite lors de la modification de la tâche avec l'id " + taskId);
    }
  }

  // Suppression d'une tâche
  async deleteTask(projectId: number, taskId: number) {
    console.log("côté serveur : " + projectId, taskId);
    
    try {
      await this.http.delete(`/project/${projectId}/task/${taskId}`).toPromise();
    } catch (error) {
      console.error("Une erreur s'est produite lors de la suppression de la tâche avec l'id  :" + taskId, error);
      throw error;
    }
  }

}