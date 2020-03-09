const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('./../src/app');
const User = require('./../src/models/user')

const user1Id = new mongoose.Types.ObjectId()
const user1 = {
    _id: user1Id,
    name: 'Andrew',
    email: 'andf@example.com',
    password: '50what!!!',
    tokens: [{
        token: jwt.sign({_id: user1Id}, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(user1).save();
})

test('should signup a user', async () => {
    await request(app).post('/users').send({
        name: 'harshal',
        email: 'harshal@example.com',
        password: 'pass2344!!'
    }).expect(201)
})

test('Should log in existing user', async () => {
    await request(app).post('/users/login').send({
        email: user1.email,
        password: user1.password,
    }).expect(200)
})

test('Should not login non existing user', async () => {
    await request(app).post('/users/login').send({
        email: 'akjdasd;aksd@wewer.com',
        password: 'asdasdasdas',
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app).get('/users/me')
    .set('Authorization', `Bearer ${user1.tokens[0].token}`)
                    .send()
                    .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app).get('/users/me')
    .send()
    .expect(401);
})

test('Should delete account for authorized user', async () => {
    await request(app).delete('/users/me')
    .set('Authorization', `Bearer ${user1.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not delete account for unauthorized user', async () => {
    await request(app).delete('/users/me')
    .send()
    .expect(401)
})