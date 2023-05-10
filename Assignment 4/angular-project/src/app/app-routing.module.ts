import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TeamComponent } from './team/team.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UserComponent },
  { path: 'teams', component: TeamComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'tasks', component: TaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
