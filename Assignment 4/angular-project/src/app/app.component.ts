import { Component } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './model/task';
import { User } from './model/user';
import { Project } from './model/project';
import { UserService } from './user.service';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Master Task Manager";
  tasks: Task[] = [];
  assignedUsers: User[] = [];
  assignedProjects: Project[] = [];

  constructor(private taskService: TaskService, private userService: UserService, private projectService: ProjectService) {
    this.initData();
  }

  async initData() {
    this.tasks = await this.taskService.getTasks();
    this.assignedUsers = await this.userService.getUsers();
    this.assignedProjects = await this.projectService.getProjects();
  }

  addUser(firstName: string, lastName: string, username: string, email: string, password: string) {
    this.userService.addUser(firstName, lastName, username, email, password);
    this.userService.getUsers().then(users => this.assignedUsers = users);
  }

  removeUser(user: User) {
    this.userService.deleteUser(user);
    this.userService.getUsers().then(users => this.assignedUsers = users);
  }

  addProject(name: string, description: string) {
    this.projectService.addProject(name, description);
    this.projectService.getProjects().then(projects => this.assignedProjects = projects);
  }

  removeProject(project: Project) {
    this.projectService.deleteProject(project);
    this.projectService.getProjects().then(projects => this.assignedProjects = projects);
  }

  async addTask(name: string, description: string, date: Date, assignedUsers?: User[]) {
    await this.taskService.addTask(name, description, date);
    this.tasks = await this.taskService.getTasks();
  }

  async removeTask(task: Task) {
    await this.taskService.deleteTask(task);
    this.tasks = await this.taskService.getTasks();
  }
}
