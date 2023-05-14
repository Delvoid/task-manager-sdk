export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}
export interface Database {
    createTask(task: Task): Promise<boolean>;
    getTask(id: string): Promise<Task | null>;
    deleteTask(id: string): Promise<void>;
    listTasks(): Promise<Task[]>;
}
export declare class TaskManager {
    private db;
    constructor(db: Database);
    createTask(title: string, description: string): Promise<boolean>;
    getTask(id: string): Promise<Task | null>;
    deleteTask(id: string): Promise<void>;
    listTasks(): Promise<Task[]>;
    private generateId;
}
