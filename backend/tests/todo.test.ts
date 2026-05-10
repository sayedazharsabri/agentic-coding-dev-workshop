import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app';
import { TodoModel } from '../src/models/todo.model';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await TodoModel.deleteMany({});
});

describe('Backend API Test Cases', () => {
  describe('1. POST /api/v1/todos (Create Todo)', () => {
    it('Should successfully create a new todo with only a title (returns 201)', async () => {
      const res = await request(app)
        .post('/api/v1/todos')
        .send({ title: 'Test Todo Title' });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Test Todo Title');
      expect(res.body.data.isCompleted).toBe(false);
    });

    it('Should successfully create a new todo with title, description, and isCompleted (returns 201)', async () => {
      const res = await request(app)
        .post('/api/v1/todos')
        .send({
          title: 'Full Todo',
          description: 'This is a description',
          isCompleted: true,
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Full Todo');
      expect(res.body.data.description).toBe('This is a description');
      expect(res.body.data.isCompleted).toBe(true);
    });

    it('Should return 400 Bad Request if the title is missing', async () => {
      const res = await request(app)
        .post('/api/v1/todos')
        .send({ description: 'No title provided' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('Should return 400 Bad Request if the title is empty (less than 1 character)', async () => {
      const res = await request(app)
        .post('/api/v1/todos')
        .send({ title: '' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('Should return 400 Bad Request if the title exceeds 100 characters', async () => {
      const longTitle = 'a'.repeat(101);
      const res = await request(app)
        .post('/api/v1/todos')
        .send({ title: longTitle });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('Should return 400 Bad Request if the description exceeds 500 characters', async () => {
      const longDesc = 'a'.repeat(501);
      const res = await request(app)
        .post('/api/v1/todos')
        .send({ title: 'Valid Title', description: longDesc });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('Should return 400 Bad Request if unexpected data types are provided (e.g., isCompleted as string)', async () => {
      const res = await request(app)
        .post('/api/v1/todos')
        .send({ title: 'Valid', isCompleted: 'not-a-boolean' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('2. GET /api/v1/todos (Get All Todos)', () => {
    it('Should return an empty array if there are no todos in the database', async () => {
      const res = await request(app).get('/api/v1/todos');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(0);
    });

    it('Should return a list of todos successfully (returns 200)', async () => {
      await TodoModel.create([{ title: 'Todo 1' }, { title: 'Todo 2' }]);

      const res = await request(app).get('/api/v1/todos');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(2);
    });

    it('Should verify that the returned todos are sorted by `createdAt` in descending order', async () => {
      await TodoModel.create({ title: 'Old Todo', createdAt: new Date(Date.now() - 10000) });
      await TodoModel.create({ title: 'New Todo', createdAt: new Date() });

      const res = await request(app).get('/api/v1/todos');

      expect(res.status).toBe(200);
      expect(res.body.data[0].title).toBe('New Todo');
      expect(res.body.data[1].title).toBe('Old Todo');
    });
  });

  describe('3. GET /api/v1/todos/:id (Get Todo by ID)', () => {
    it('Should return the correct todo object when a valid and existing ID is provided (returns 200)', async () => {
      const todo = await TodoModel.create({ title: 'Target Todo' });

      const res = await request(app).get(`/api/v1/todos/${todo._id}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Target Todo');
    });

    it('Should return 404 Not Found if the provided ID is valid but does not exist in the database', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app).get(`/api/v1/todos/${fakeId}`);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it('Should return 400 Bad Request if the provided ID is not a valid MongoDB ObjectId format', async () => {
      const res = await request(app).get('/api/v1/todos/invalid-id');

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('4. PUT /api/v1/todos/:id (Update Todo)', () => {
    it('Should successfully update the title of an existing todo (returns 200)', async () => {
      const todo = await TodoModel.create({ title: 'Old Title' });

      const res = await request(app)
        .put(`/api/v1/todos/${todo._id}`)
        .send({ title: 'New Title' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('New Title');
    });

    it('Should successfully toggle the `isCompleted` status of an existing todo (returns 200)', async () => {
      const todo = await TodoModel.create({ title: 'Task', isCompleted: false });

      const res = await request(app)
        .put(`/api/v1/todos/${todo._id}`)
        .send({ isCompleted: true });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.isCompleted).toBe(true);
    });

    it('Should successfully update multiple fields simultaneously', async () => {
      const todo = await TodoModel.create({ title: 'Initial', description: 'Desc', isCompleted: false });

      const res = await request(app)
        .put(`/api/v1/todos/${todo._id}`)
        .send({ title: 'Updated', description: 'New Desc', isCompleted: true });

      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe('Updated');
      expect(res.body.data.description).toBe('New Desc');
      expect(res.body.data.isCompleted).toBe(true);
    });

    it('Should return 404 Not Found if attempting to update a non-existent but valid ID', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app)
        .put(`/api/v1/todos/${fakeId}`)
        .send({ title: 'Try Update' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it('Should return 400 Bad Request if the provided ID is not a valid MongoDB ObjectId format', async () => {
      const res = await request(app)
        .put('/api/v1/todos/invalid-id')
        .send({ title: 'Title' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('Should return 400 Bad Request if the update payload contains invalid data (e.g., empty title)', async () => {
      const todo = await TodoModel.create({ title: 'Valid' });

      const res = await request(app)
        .put(`/api/v1/todos/${todo._id}`)
        .send({ title: '' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('5. DELETE /api/v1/todos/:id (Delete Todo)', () => {
    it('Should successfully delete an existing todo (returns 200 and success message)', async () => {
      const todo = await TodoModel.create({ title: 'To be deleted' });

      const res = await request(app).delete(`/api/v1/todos/${todo._id}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('Should verify the deleted todo can no longer be fetched', async () => {
      const todo = await TodoModel.create({ title: 'To be deleted 2' });
      await request(app).delete(`/api/v1/todos/${todo._id}`);

      const getRes = await request(app).get(`/api/v1/todos/${todo._id}`);
      expect(getRes.status).toBe(404);
    });

    it('Should return 404 Not Found if attempting to delete a non-existent but valid ID', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app).delete(`/api/v1/todos/${fakeId}`);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it('Should return 400 Bad Request if the provided ID is not a valid MongoDB ObjectId format', async () => {
      const res = await request(app).delete('/api/v1/todos/invalid-id');

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
