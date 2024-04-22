export type User = {
    id: number;
    name: string;
    password: string;
    email: string;
    projects: Project[];
    sub: string;   // correspond à l'id du User
    exp: string;   // expiration date
    iat: number;   // issued at (date)
}

export type IItemObject = {
    id: number;
    name: string;
}

export const enum TaskStatus {
    TO_DO = "TO_DO",
    ONGOING = "ONGOING",
    DONE = "DONE"
}

export type Project = {
    id: number;
    name: string;
    userId: number;
    tasks: Task[];
}

export type ProjectForm = {
    name: string;
}

export type UserToGet = {
    id: number;
    name: string;
    password: string;
    email: string;
    projects: Project[];
}

export type UserId = {
    id: number;
}

export type TaskForm = {
    title: string;
    description?: string;
    status: TaskStatus;
    estimationHours: number;
    projectId: number;
}

export type TaskToDisplay = {
    title: string;
}

export type Task = {
    id: number;
    title: string;
    description?: string;
    status: TaskStatus;
    estimationHours: number;
    projectId: number;
}
