import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app';
import prisma from '../src/db';

describe('Auth API', () => {
  before(async () => {
    // Clear users before tests
    await prisma.note.deleteMany();
    await prisma.user.deleteMany();
  });

  let token: string;

  it('should signup a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'test@example.com', password: 'mypassword' });

    expect(res.status).to.equal(201);
    expect(res.body.user.email).to.equal('test@example.com');
    expect(res.body).to.have.property('token');
    token = res.body.token;
  });

  it('should not allow duplicate signup', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'test@example.com', password: 'mypassword' });

    expect(res.status).to.equal(400);
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'mypassword' });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('should fail login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'wrong' });

    expect(res.status).to.equal(400);
  });
});