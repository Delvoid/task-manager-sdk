"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManager = void 0;
class TaskManager {
    constructor(db) {
        this.db = db;
    }
    async createTask(title, description) {
        const task = {
            id: this.generateId(),
            title,
            description,
            completed: false,
        };
        return await this.db.createTask(task);
    }
    async getTask(id) {
        return await this.db.getTask(id);
    }
    async deleteTask(id) {
        await this.db.deleteTask(id);
    }
    async listTasks() {
        return await this.db.listTasks();
    }
    generateId() {
        return Math.random().toString(36);
    }
}
exports.TaskManager = TaskManager;
