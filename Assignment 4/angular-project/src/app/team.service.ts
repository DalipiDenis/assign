import { Injectable } from '@angular/core';
import { Team } from './model/team';
import { User } from './model/user';
import { Project } from './model/project';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends Dexie {
  teams: Dexie.Table<Team, number>;

  constructor() {
    super('TeamServiceDatabase');
    this.version(1).stores({
      teams: '++id, name, description, members, projectList'
    });

    this.teams = this.table('teams');
  }

  async getTeams(): Promise<Team[]> {
    return this.teams.toArray();
  }

  async addTeam(name: string, description: string, members: User[], projectList: Project[]): Promise<void> {
    const team: Team = {name, description, members, projectList};
    await this.teams.add(team);
  }

  async deleteTeam(team: Team): Promise<void> {
    await this.teams.delete(team.id!);
  }

  async updateTeam(updatedTeam: Team): Promise<void> {
    await this.teams.update(updatedTeam.id!, updatedTeam);
  }
}
