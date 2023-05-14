import type { Database, Task } from '..';
export declare class MongoDB implements Database {
    private uri;
    private dbName;
    private collectionName;
    private client;
    private db;
    private collection;
    constructor(uri: string, dbName: string, collectionName: string);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    createTask(task: Task): Promise<boolean>;
    getTask(id: string): Promise<Task | null>;
    deleteTask(id: string): Promise<void>;
    listTasks(): Promise<Task[]>;
    clearCollection(): Promise<void>;
}
