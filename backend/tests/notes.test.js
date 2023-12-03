const request = require('supertest');
const app = require('../index');

let token;

beforeAll(async () => {
  // Log in a user and get the token for further requests
  const res = await request(app).post('/auth/login').send({
    username: 'testuser',
    password: 'testpassword',
  });
  token = res.body.token;
});

describe('Notes Endpoints', () => {
  it('should create a new note', async () => {
    const res = await request(app)
      .post('/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Note',
        body: 'This is a test note.',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get all notes', async () => {
    const res = await request(app).get('/notes').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get all notes', async () => {
    // Create a test note
    await Note.create({ title: 'Test Note', body: 'This is a test note' });

    const response = await request(app).get('/notes').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe('Test Note');
    expect(response.body[0].body).toBe('This is a test note');
  });

  it('should get a specific note', async () => {
    // Create a test note
    const createdNote = await Note.create({
      title: 'Test Note',
      body: 'This is a test note',
    });

    const response = await request(app).get(`/notes/${createdNote._id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Test Note');
    expect(response.body.body).toBe('This is a test note');
  });



});
