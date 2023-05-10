import { Component, OnInit } from '@angular/core';
import { Task } from "../model/task";
import { TaskService } from '../task.service';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { Project } from '../model/project';
import { ProjectService } from '../project.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>([]);
  editedTask: Task | null = null;

  users: User[] = [];
  projects: Project[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'date', 'done', 'users', 'projects', 'actions'];
  taskForm: FormGroup;

  constructor(private taskService: TaskService, private userService: UserService, private projectService: ProjectService, private formBuilder: FormBuilder ) {
    this.taskForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      assignedUsers: [''],
      assignedProjects: [''],
    });
  }

  async ngOnInit() {
    this.getTasks();
    await this.getUsers();
    await this.getProjects();
  }

  async getUsers(): Promise<void> {
    this.users = await this.userService.getUsers();
  }

  async getProjects(): Promise<void> {
    this.projects = await this.projectService.getProjects();
  }

  async getTasks(): Promise<void> {
   this.tasks = await this.taskService.getTasks();
   this.dataSource = new MatTableDataSource(this.tasks);
 }

 saveTask(): void {
   const task = this.taskForm.value;
   if (task.id) {
     this.taskService.updateTask(task);
   } else {
     this.addNewTask(
       task.name,
       task.description,
       task.date,
       task.assignedUsers,
       task.assignedProjects
     );
   }
   this.taskForm.reset();
   this.getTasks();
 }

 editTask(task: Task): void {
   this.editedTask = task;
   this.taskForm.patchValue({ ...task, id: task.id });
 }

 addNewTask(name: string, description: string, date: Date, assignedUsers: User[], assignedProjects: Project[]): void {
   this.taskService.addTask(name, description, date, assignedUsers, assignedProjects);
   this.getTasks();
 }

 deleteTask(task: Task): void {
    this.taskService.deleteTask(task);
    this.getTasks();
  }

 getDisplayUsers(task: Task): string {
  return task.assignedUsers
    ? task.assignedUsers
        .map(user => `${user.firstName} ${user.lastName}`)
        .join(', ')
    : '';
 }

 getDisplayProjects(task: Task): string {
   return task.assignedProjects
     ? task.assignedProjects
         .map(project => `${project.name}`)
         .join(', ')
     : '';
 }

 onTaskStatusChange(task: Task): void {
     this.taskService.updateTask(task);
 }

 updateTask(): void {
   const task = this.taskForm.value;
   this.taskService.updateTask(task);
   this.editedTask = null;
   this.taskForm.reset();
   this.getTasks();
 }

 cancelEditing(): void {
   this.editedTask = null;
 }

 compareObjects(o1: any, o2: any): boolean {
   return o1 && o2 ? o1.id === o2.id : o1 === o2;
 }

}
