const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');

beforeAll(async () => {
  // Connect to a testing database
  await mongoose.connect('mongodb+srv://shamsulca:shamsulca2023@cluster0.l7efxwe.mongodb.net/?retryWrites=true&w=majority');
});

// afterAll(async () => {
//   // Disconnect from the testing database
//   await mongoose.disconnect();
// });


describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/auth/register').send({
      username: 'testuser',
      password: 'testpassword',
    });
    expect(res.statusCode).toEqual(201);
  }, 20000);

  it('should log in an existing user', async () => {
    const res = await request(app).post('/auth/login').send({
      username: 'testuser',
      password: 'testpassword',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  }, 20000);
});
