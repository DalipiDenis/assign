import { User } from "./user";
import { Project } from "./project";

export interface Task {
    id?: number;
    name: string;
    description: string;
    date: Date;
    isDone: boolean;
    assignedUsers?: User[];
    assignedProjects?: Project[];
    moduleList?: string[];
}
