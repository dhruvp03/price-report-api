const request = require('supertest')

const db = require('../src/db/mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

beforeAll(async () => await db.connectDatabase());

afterAll(async () => await db.closeDatabase());