import { TaskManager } from '../src/index';
import { MongoDB } from '../src/connectors/mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('TaskManager', () => {
  let mongod: MongoMemoryServer;
  let db: MongoDB;
  let taskManager: TaskManager;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    db = new MongoDB(uri, 'testDB', 'testCollection');
    await db.connect();
    taskManager = new TaskManager(db);
  });

  afterAll(async () => {
    await db.disconnect();
    await mongod.stop();
  });

  beforeEach(async () => {
    await db.clearCollection();
  });

  it('should create a task', async () => {
    const title = 'Test Task';
    const description = 'This is a test task';
    const taskCreated = await taskManager.createTask(title, description);

    expect(taskCreated).toBe(true);

    const tasks = await taskManager.listTasks();

    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe(title);
    expect(tasks[0].description).toBe(description);
    expect(tasks[0].completed).toBe(false);
  });

  it('should get a task', async () => {
    const title = 'Test Task 2';
    const description = 'This is another test task';
    await taskManager.createTask(title, description);

    const tasks = await taskManager.listTasks();
    const task = await taskManager.getTask(tasks[0].id);

    expect(task).not.toBeNull();
    expect(task?.title).toBe(title);
    expect(task?.description).toBe(description);
    expect(task?.completed).toBe(false);
  });

  it('should delete a task', async () => {
    const title = 'Test Task 3';
    const description = 'This is yet another test task';
    await taskManager.createTask(title, description);

    let tasks = await taskManager.listTasks();
    const taskId = tasks[0].id;

    await taskManager.deleteTask(taskId);

    tasks = await taskManager.listTasks();
    const taskAfterDeletion = tasks.find((task) => task.id === taskId);

    expect(taskAfterDeletion).toBeUndefined();
  });
});
