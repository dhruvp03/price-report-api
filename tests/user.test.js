const supertest = require('supertest')

const db = require('../src/db/mongoose')
const app = require('../src/app')
const User = require('../src/models/user');

const request = supertest(app)

beforeAll(async () => await db.connectDatabase());

afterAll(async () => await db.dropAndCloseDatabase());

describe('Testing User Routes', ()=>{
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

describe('Testing Report Routes', ()=>{
    let reportID_;
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

        reportID_ = body.reportID

        const responseBody = await request.post('/reports').set('Authorization', ('Bearer '+ jwt_token)).send({
            reportDetails:{
                marketID:"market-1",
                marketName:"Vashi Navi Mumbai",
                cmdtyID:"cmdty-1",
                marketType:"Mandi",
                cmdtyName:"Potato",
                priceUnit:"Quintal",
                convFctr: 100,
                price: 1600
            }
        })
        
        expect(body).toEqual(
            expect.objectContaining({
                status:"success",
                reportID: expect.any(String)
            })
        )
    
        expect(statusCode).toEqual(200)
        expect(responseBody.body.reportID).toBe(reportID_)
    })

    test('it should return the aggregate report by ID', async ()=>{
        const authResponse = await request.post('/user/login').send({
            email: "test@example.com",
            password:"testuser123"
        })
    
        const jwt_token = authResponse.body.token

        const { body, statusCode } = await request.get(`/reports?reportID=${reportID_}`).set('Authorization', ('Bearer '+ jwt_token))

        console.log(body)

        expect(statusCode).toBe(200)
        expect(body).toEqual(
            expect.objectContaining({
                _id: expect.any(String),
                cmdtyName: expect.any(String),
                cmdtyID: expect.any(String),
                marketID: expect.any(String),
                marketName: expect.any(String),
                users: expect.anything(),
                timestamp: expect.anything(),
                priceUnit: expect.any(String),
                price: expect.any(Number)
            })
        )
    })
})