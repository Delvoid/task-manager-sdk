"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDB = void 0;
const mongodb_1 = require("mongodb");
class MongoDB {
    constructor(uri, dbName, collectionName) {
        this.uri = uri;
        this.dbName = dbName;
        this.collectionName = collectionName;
    }
    async connect() {
        try {
            this.client = new mongodb_1.MongoClient(this.uri);
            await this.client.connect();
            this.db = this.client.db(this.dbName);
            this.collection = this.db.collection(this.collectionName);
        }
        catch (error) {
            console.error('Failed to connect to MongoDB', error);
            throw error;
        }
    }
    async disconnect() {
        try {
            await this.client.close();
        }
        catch (error) {
            console.error('Failed to disconnect from MongoDB', error);
            throw error;
        }
    }
    async createTask(task) {
        try {
            const result = await this.collection.insertOne(task);
            return result.acknowledged;
        }
        catch (error) {
            console.error('Failed to create task in MongoDB', error);
            throw error;
        }
    }
    async getTask(id) {
        try {
            return await this.collection.findOne({ id });
        }
        catch (error) {
            console.error('Failed to get task from MongoDB', error);
            throw error;
        }
    }
    async deleteTask(id) {
        try {
            await this.collection.deleteOne({ id });
        }
        catch (error) {
            console.error('Failed to delete task from MongoDB', error);
            throw error;
        }
    }
    async listTasks() {
        try {
            return await this.collection.find({}).toArray();
        }
        catch (error) {
            console.error('Failed to list tasks from MongoDB', error);
            throw error;
        }
    }
    async clearCollection() {
        try {
            await this.collection.deleteMany({});
        }
        catch (error) {
            console.error('Failed to clear collection in MongoDB', error);
            throw error;
        }
    }
}
exports.MongoDB = MongoDB;
