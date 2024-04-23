import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project, ProjectForm, UserToGet } from '../types';
import { UserService } from './user.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[] = [];
  user: UserToGet | undefined;
  userId: number = parseInt(localStorage.getItem('userId')!);

  constructor(private http: HttpClient) { }

  // Afficher tous les projets de la BDD
  getProjects(userId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`/project/user/${userId}`)
    .pipe();
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`/project/${id}`).pipe();
  }

  // Ajouter un projet
  async addProject(project: ProjectForm) {
    console.log(project);
    
    const newProject = await this.http.post<Project>("/project", project).toPromise();
    if (!newProject) throw new Error("Projet non créé.");
    
    // Mise à jour de la liste des projets depuis le serveur
    this.getProjects(this.userId).subscribe(projects => {
      this.projects = projects;
    });
  }

  // Modification d'un projet
  async updateProject(id: number, project: ProjectForm) {
    try {
      const updatedProject = await this.http.put<Project>(`/project/${id}`, project).toPromise();

      if (!updatedProject) throw new Error("Aucun projet à modifier");
  
      // Mise à jour de la liste des projets depuis le serveur
      this.getProjects(this.userId).subscribe(projects => {
        this.projects = projects;
      });

    } catch(error) {
      console.error("Une erreur s'est produite lors de la modification du projet avec l'id " + id);
    }
  }

  // Suppression d'un projet
  async deleteProject(id: number) {
    try {
      await this.http.delete(`/project/${id}`).toPromise();
    } catch (error) {
      console.error("Une erreur s'est produite lors de la suppression du projet :", error);
      throw error;
    }
  }
}
