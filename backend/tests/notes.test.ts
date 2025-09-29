import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app';
import prisma from '../src/db';

describe('Notes API', () => {
  let token: string;
  let noteId: string;

  before(async () => {
    await prisma.note.deleteMany();
    await prisma.user.deleteMany();

    // Signup user and store token
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'notes@example.com', password: 'password' });

    token = res.body.token;
  });

  it('should create a note', async () => {
    const res = await request(app)
      .post('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Note', content: 'Hello world' });

    expect(res.status).to.equal(201);
    expect(res.body.title).to.equal('Test Note');
    noteId = res.body.id;
  });

  it('should get all notes', async () => {
    const res = await request(app)
      .get('/api/notes')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should get a single note', async () => {
    const res = await request(app)
      .get(`/api/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.id).to.equal(noteId);
  });

  it('should update a note', async () => {
    const res = await request(app)
      .put(`/api/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Note', content: 'Updated content' });

    expect(res.status).to.equal(200);
    expect(res.body.title).to.equal('Updated Note');
  });

  it('should delete a note', async () => {
    const res = await request(app)
      .delete(`/api/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Note deleted');
  });
});