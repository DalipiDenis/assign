import { UserService } from './user.service';
import { ProjectService } from './project.service';
import { TaskService } from './task.service';
import { TeamService } from './team.service';

export async function resetDatabase() {
  const userServiceDb = new UserService();
  const projectServiceDb = new ProjectService();
  const taskServiceDb = new TaskService();
  const teamServiceDb = new TeamService();

  await userServiceDb.delete();
  await userServiceDb.open();

  await projectServiceDb.delete();
  await projectServiceDb.open();

  await taskServiceDb.delete();
  await taskServiceDb.open();

  await teamServiceDb.delete();
  await teamServiceDb.open();
}
