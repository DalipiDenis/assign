import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Team } from '../model/team';
import { User } from '../model/user';
import { Project } from '../model/project';
import { TeamService } from '../team.service';
import { UserService } from '../user.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teams: MatTableDataSource<Team> = new MatTableDataSource<Team>();
  users: User[] = [];
  projects: Project[] = [];
  editedTeam: Team | null = null;
  displayedColumns: string[] = ['id', 'name', 'description', 'action'];

  constructor(private teamService: TeamService, private userService: UserService, private projectService: ProjectService) {}

  async ngOnInit() {
    await this.getTeams();
    await this.getUsers();
    this.getProjects();
  }

  async getTeams(): Promise<void> {
    this.teams.data = await this.teamService.getTeams();
  }

  async getUsers(): Promise<void> {
    this.users = await this.userService.getUsers();
  }

  async getProjects(): Promise<void> {
    this.projects = await this.projectService.getProjects();
  }

  editTeam(team: Team): void {
    this.editedTeam = { ...team };
  }

  async addTeam(name: string, description: string, members: User[], projectList: Project[]): Promise<void> {
    name = name.trim();
    description = description.trim();
    if (!name || !description) {
      return;
    }
    if (this.editedTeam) {
      await this.teamService.updateTeam({ ...this.editedTeam, name, description, members, projectList });
      this.editedTeam = null;
    } else {
      await this.teamService.addTeam(name, description, members, projectList);
    }
    await this.getTeams();
  }

  async deleteTeam(team: Team): Promise<void> {
    await this.teamService.deleteTeam(team);
    await this.getTeams();
  }

  async saveChanges(): Promise<void> {
    if (this.editedTeam) {
      await this.teamService.updateTeam(this.editedTeam);
      this.editedTeam = null;
    }
    await this.getTeams();
  }

  cancelEditing(): void {
    this.editedTeam = null;
  }
}
