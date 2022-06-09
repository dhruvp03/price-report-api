const supertest = require('supertest')

const db = require('../src/db/mongoose')
const app = require('../src/app')
const User = require('../src/models/user');

const request = supertest(app)

beforeAll(async () => await db.connectDatabase());

afterAll(async () => await db.closeDatabase());

describe('User Created When', ()=>{
    test('Testing creation of user', async ()=>{
        const { body,statusCode } = await request.post('/user/register').send({
            name: "Test User",
            email: "test@example.com",
            password: "testuser123"
        })

        expect(body).toEqual(
            expect.objectContaining({
                name: expect.any(String),
                email: expect.any(String),
                token: expect.any(String)
            })
        );
        expect(statusCode).toBe(200);
    });

    test('User Authentication', async () => {
        const {body,statusCode} = (await request.post('/user/login')).setEncoding({
            email: "test@example.com",
            password:"testuser123"
        })

        expect(body).toEqual(
            expect.objectContaining({
                name: expect.any(String),
                email:expect.any(String),
                token: expect.any(String)
            })
        );
        expect(statusCode).toBe(200)
    })
})