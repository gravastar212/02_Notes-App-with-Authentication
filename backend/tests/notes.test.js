"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const app_1 = __importDefault(require("../src/app"));
const db_1 = __importDefault(require("../src/db"));
describe('Notes API', () => {
    let token;
    let noteId;
    before(async () => {
        await db_1.default.note.deleteMany();
        await db_1.default.user.deleteMany();
        // Signup user and store token
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/auth/signup')
            .send({ email: 'notes@example.com', password: 'password' });
        token = res.body.token;
    });
    it('should create a note', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test Note', content: 'Hello world' });
        (0, chai_1.expect)(res.status).to.equal(201);
        (0, chai_1.expect)(res.body.title).to.equal('Test Note');
        noteId = res.body.id;
    });
    it('should get all notes', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .get('/api/notes')
            .set('Authorization', `Bearer ${token}`);
        (0, chai_1.expect)(res.status).to.equal(200);
        (0, chai_1.expect)(res.body).to.be.an('array');
    });
    it('should get a single note', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .get(`/api/notes/${noteId}`)
            .set('Authorization', `Bearer ${token}`);
        (0, chai_1.expect)(res.status).to.equal(200);
        (0, chai_1.expect)(res.body.id).to.equal(noteId);
    });
    it('should update a note', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .put(`/api/notes/${noteId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Updated Note', content: 'Updated content' });
        (0, chai_1.expect)(res.status).to.equal(200);
        (0, chai_1.expect)(res.body.title).to.equal('Updated Note');
    });
    it('should delete a note', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .delete(`/api/notes/${noteId}`)
            .set('Authorization', `Bearer ${token}`);
        (0, chai_1.expect)(res.status).to.equal(200);
        (0, chai_1.expect)(res.body.message).to.equal('Note deleted');
    });
});
