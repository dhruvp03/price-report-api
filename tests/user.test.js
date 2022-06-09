const supertest = require('supertest')

const db = require('../src/db/mongoose')
const app = require('../src/app')
const User = require('../src/models/user');

const request = supertest(app)

beforeAll(async () => await db.connectDatabase());

afterAll(async () => await db.dropAndCloseDatabase());

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
        const {body,statusCode} = await request.post('/user/login').send({
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

describe('sending reports', ()=>{
    test('it should return an aggregate report ID',async ()=>{
        const authResponse = await request.post('/user/login').send({
            email: "test@example.com",
            password:"testuser123"
        })
    
        const jwt_token = authResponse.body.token
    
        const { body, statusCode } = await request.post('/reports').set('Authorization', ('Bearer '+ jwt_token)).send({
            reportDetails:{
                marketID:"market-1",
                marketName:"Vashi Navi Mumbai",
                cmdtyID:"cmdty-1",
                marketType:"Mandi",
                cmdtyName:"Potato",
                priceUnit:"Pack",
                convFctr: 50,
                price: 700
            }
        })

    
        expect(body).toEqual(
            expect.objectContaining({
                status:"success",
                reportID: expect.any(String)
            })
        )
    
        expect(statusCode).toEqual(200)
    })
})