# Delv Task Manager

Delv Task Manager is a simple task management library. You can create, delete, and list tasks. Currently only supports the use of MongoDb

## Installation

To install Delv Task Manager, use the following command:

```shell
npm install delv-task-manager
```
# How to Use

```ts
import { TaskManager, MongoDB } from 'delv-task-manager';

const db = new MongoDB('your-mongodb-uri', 'your-database-name', 'your-collection-name');
const taskManager = new TaskManager(db);

async function main() {
await db.connect();

const success = await taskManager.createTask('Test Task', 'This is a test task');
console.log(`Did the task creation work? ${success}`);

const tasks = await taskManager.listTasks();
console.log('Got all these tasks:', tasks);

await db.disconnect();
}

main();
```

# API
`TaskManager`

The TaskManager class is the main interface for managing tasks. It supports the following methods:

- createTask(title: string, description: string): Promise<boolean>
- getTask(id: string): Promise<Task | null>
- deleteTask(id: string): Promise<void>
- listTasks(): Promise<Task[]>

`MongoDB`
The MongoDB class implements the Database interface for MongoDB. It supports the following methods:

- connect(): Promise<void>
- disconnect(): Promise<void>
- createTask(task: Task): Promise<boolean>
- getTask(id: string): Promise<Task | null>
- deleteTask(id: string): Promise<void>
- listTasks(): Promise<Task[]>
