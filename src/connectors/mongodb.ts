import type { Db, Collection } from 'mongodb';
import { MongoClient } from 'mongodb';
import type { Database, Task } from '..';

export class MongoDB implements Database {
  private client!: MongoClient;
  private db!: Db;
  private collection!: Collection;

  constructor(private uri: string, private dbName: string, private collectionName: string) {}

  async connect(): Promise<void> {
    try {
      this.client = new MongoClient(this.uri);
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      this.collection = this.db.collection(this.collectionName);
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.close();
    } catch (error) {
      console.error('Failed to disconnect from MongoDB', error);
      throw error;
    }
  }

  async createTask(task: Task): Promise<boolean> {
    try {
      const result = await this.collection.insertOne(task);

      return result.acknowledged;
    } catch (error) {
      console.error('Failed to create task in MongoDB', error);
      throw error;
    }
  }

  async getTask(id: string): Promise<Task | null> {
    try {
      return await this.collection.findOne<Task | null>({ id });
    } catch (error) {
      console.error('Failed to get task from MongoDB', error);
      throw error;
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      await this.collection.deleteOne({ id });
    } catch (error) {
      console.error('Failed to delete task from MongoDB', error);
      throw error;
    }
  }

  async listTasks(): Promise<Task[]> {
    try {
      return await this.collection.find<Task>({}).toArray();
    } catch (error) {
      console.error('Failed to list tasks from MongoDB', error);
      throw error;
    }
  }

  async clearCollection(): Promise<void> {
    try {
      await this.collection.deleteMany({});
    } catch (error) {
      console.error('Failed to clear collection in MongoDB', error);
      throw error;
    }
  }
}
