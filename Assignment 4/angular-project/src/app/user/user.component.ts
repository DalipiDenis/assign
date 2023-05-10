import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: MatTableDataSource<User> = new MatTableDataSource<User>();
  editedUser: User | null = null;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'email', 'action'];

  constructor(private userService: UserService) {}

  async ngOnInit() {
    await this.getUsers();
  }

  async getUsers(): Promise<void> {
    this.users.data = await this.userService.getUsers();
  }

  editUser(user: User): void {
    this.editedUser = { ...user };
  }

  async addUser(firstName: string, lastName: string, username: string, email: string, password: string): Promise<void> {
    firstName = firstName.trim();
    lastName = lastName.trim();
    username = username.trim();
    email = email.trim();
    password = password.trim();
    if (!firstName || !lastName || !username || !email) {
      return;
    }
    if (this.editedUser) {
      await this.userService.updateUser({ ...this.editedUser, firstName, lastName, username, email, password });
      this.editedUser = null;
    } else {
      await this.userService.addUser(firstName, lastName, username, email, password);
    }
    await this.getUsers();
  }

  async deleteUser(user: User): Promise<void> {
    await this.userService.deleteUser(user);
    await this.getUsers();
  }

  async saveChanges(): Promise<void> {
    if (this.editedUser) {
      await this.userService.updateUser(this.editedUser);
      this.editedUser = null;
    }
    await this.getUsers();
  }

  cancelEditing(): void {
    this.editedUser = null;
  }
}
