import { Injectable } from '@angular/core';
import { User } from './model/user';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class UserService extends Dexie {
  users: Dexie.Table<User, number>;

  constructor() {
    super('UserServiceDatabase');
    this.version(1).stores({
      users: '++id, firstName, lastName, username, email, password'
    });

    this.users = this.table('users');
  }

  async getUsers(): Promise<User[]> {
    return this.users.toArray();
  }

  addUser(firstName: string, lastName: string, username: string, email: string, password: string): void {
    const user: User = { firstName, lastName, username, email, password };
    this.users.add(user);
  }

  async deleteUser(user: User): Promise<void> {
    await this.users.delete(user.id!);
  }

  async updateUser(updatedUser: User): Promise<void> {
    await this.users.update(updatedUser.id!, updatedUser);
  }
}
