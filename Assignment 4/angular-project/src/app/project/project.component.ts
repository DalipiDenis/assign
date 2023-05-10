import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../model/project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  projects: MatTableDataSource<Project> = new MatTableDataSource<Project>([]);
  editedProject?: Project;
  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private projectService: ProjectService) {}

  async ngOnInit() {
    await this.getProjects();
    this.projects.sort = this.sort;
  }

  async getProjects(): Promise<void> {
    this.projects.data = await this.projectService.getProjects();
  }

  async addProject(name: string, description: string): Promise<void> {
    name = name.trim();
    description = description.trim();
    if (!name || !description) {
      return;
    }
    await this.projectService.addProject(name, description);
    await this.getProjects();
  }

  async deleteProject(project: Project): Promise<void> {
    await this.projectService.deleteProject(project);
    await this.getProjects();
  }

  editProject(project: Project): void {
    this.editedProject = { ...project };
  }

  cancelEditing(): void {
    this.editedProject = undefined;
  }

  updateProject(project: Project, name: string, description: string): void {
    const index = this.projects.data.findIndex(p => p.id === project.id);
    if (index >= 0) {
      this.projects.data[index].name = name;
      this.projects.data[index].description = description;
    }
  }

  saveChanges(): void {
    if (this.editedProject) {
      this.projectService.updateProject(this.editedProject);
      this.editedProject = undefined;
      this.getProjects();
    }
  }
}
