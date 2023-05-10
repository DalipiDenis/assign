import { Injectable } from '@angular/core';
import { Task } from './model/task';
import { User } from './model/user';
import { Project } from './model/project';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends Dexie {
  tasks: Dexie.Table<Task, number>;

  constructor() {
    super('TaskServiceDatabase');
    this.version(1).stores({
      tasks: '++id, name, description, date, isDone, assignedUsers, assignedProjects'
    });

    this.tasks = this.table('tasks');
  }

  async getTasks(): Promise<Task[]> {
    return this.tasks.toArray();
  }

  async addTask(name: string, description: string, date: Date, assignedUsers?: User[], assignedProjects?: Project[]): Promise<void> {
    const task: Task = { name, description, date, isDone: false };
    if (assignedUsers) {
      task.assignedUsers = assignedUsers;
    }
    if (assignedProjects) {
      task.assignedProjects = assignedProjects;
    }
    await this.tasks.add(task);
  }

  async deleteTask(task: Task): Promise<void> {
    await this.tasks.delete(task.id!);
  }

  async updateTask(task: Task): Promise<void> {
    await this.tasks.update(task.id!, task);
  }
}
