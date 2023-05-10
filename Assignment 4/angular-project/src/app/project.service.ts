import { Injectable } from '@angular/core';
import { Project } from './model/project';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends Dexie {
  projects: Dexie.Table<Project, number>;

  constructor() {
    super('ProjectServiceDatabase');
    this.version(1).stores({
      projects: '++id, name, description, action'
    });

    this.projects = this.table('projects');
  }

  async getProjects(): Promise<Project[]> {
    return this.projects.toArray();;
  }

  addProject(name: string, description: string) {
    const project: Project = {name, description};
    this.projects.add(project);
  }

  async deleteProject(project: Project): Promise<void> {
    await this.projects.delete(project.id!);
  }

  async updateProject(updatedProject: Project): Promise<void> {
    await this.projects.update(updatedProject.id!, updatedProject);
  }
}
