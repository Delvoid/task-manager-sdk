export { MongoDB } from './connectors/mongodb';

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

export class TaskManager {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async createTask(title: string, description: string): Promise<boolean> {
    const task: Task = {
      id: this.generateId(),
      title,
      description,
      completed: false,
    };
    return await this.db.createTask(task);
  }

  async getTask(id: string): Promise<Task | null> {
    return await this.db.getTask(id);
  }

  async deleteTask(id: string): Promise<void> {
    await this.db.deleteTask(id);
  }

  async listTasks(): Promise<Task[]> {
    return await this.db.listTasks();
  }

  private generateId(): string {
    return Math.random().toString(36);
  }
}
