import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app';

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

describe('Integration Test: Todo CRUD Lifecycle', () => {
  let createdTodoId: string;

  it('1. Should create a new todo', async () => {
    const res = await request(app)
      .post('/api/v1/todos')
      .send({
        title: 'Integration Test Todo',
        description: 'Testing the full lifecycle',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Integration Test Todo');
    expect(res.body.data._id).toBeDefined();

    createdTodoId = res.body.data._id;
  });

  it('2. Should retrieve the created todo in the list of all todos', async () => {
    const res = await request(app).get('/api/v1/todos');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);

    const foundTodo = res.body.data.find((todo: any) => todo._id === createdTodoId);
    expect(foundTodo).toBeDefined();
    expect(foundTodo.title).toBe('Integration Test Todo');
  });

  it('3. Should retrieve the created todo by ID', async () => {
    const res = await request(app).get(`/api/v1/todos/${createdTodoId}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data._id).toBe(createdTodoId);
    expect(res.body.data.title).toBe('Integration Test Todo');
  });

  it('4. Should update the created todo', async () => {
    const res = await request(app)
      .put(`/api/v1/todos/${createdTodoId}`)
      .send({
        title: 'Updated Integration Test Todo',
        isCompleted: true,
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Updated Integration Test Todo');
    expect(res.body.data.isCompleted).toBe(true);
  });

  it('5. Should verify the todo is updated by fetching it again', async () => {
    const res = await request(app).get(`/api/v1/todos/${createdTodoId}`);

    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('Updated Integration Test Todo');
    expect(res.body.data.isCompleted).toBe(true);
  });

  it('6. Should delete the created todo', async () => {
    const res = await request(app).delete(`/api/v1/todos/${createdTodoId}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('7. Should verify the deleted todo no longer exists', async () => {
    const res = await request(app).get(`/api/v1/todos/${createdTodoId}`);

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
