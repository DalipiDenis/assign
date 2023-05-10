import { User } from "./user";
import { Project } from "./project";
import { Task } from "./task";

export interface Team {
    id?: number;
    name: string;
    description: string;
    members?: User[];
    taskList?: Task[];
    projectList?: Project[];
    moduleList?: string[];
}
