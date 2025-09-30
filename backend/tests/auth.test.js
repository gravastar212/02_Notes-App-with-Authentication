"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const app_1 = __importDefault(require("../src/app"));
const db_1 = __importDefault(require("../src/db"));
describe('Auth API', () => {
    before(async () => {
        // Clear users before tests
        await db_1.default.note.deleteMany();
        await db_1.default.user.deleteMany();
    });
    let token;
    it('should signup a new user', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/auth/signup')
            .send({ email: 'test@example.com', password: 'mypassword' });
        (0, chai_1.expect)(res.status).to.equal(201);
        (0, chai_1.expect)(res.body.user.email).to.equal('test@example.com');
        (0, chai_1.expect)(res.body).to.have.property('token');
        token = res.body.token;
    });
    it('should not allow duplicate signup', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/auth/signup')
            .send({ email: 'test@example.com', password: 'mypassword' });
        (0, chai_1.expect)(res.status).to.equal(400);
    });
    it('should login an existing user', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'mypassword' });
        (0, chai_1.expect)(res.status).to.equal(200);
        (0, chai_1.expect)(res.body).to.have.property('token');
    });
    it('should fail login with wrong password', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'wrong' });
        (0, chai_1.expect)(res.status).to.equal(400);
    });
});
