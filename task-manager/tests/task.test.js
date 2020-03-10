const request = require('supertest');
const Task = require('./../src/models/tasks');
const {user1Id, user1, setupDatabase, user2, task1Id} = require('./fixtures/db')
const app = require("./../src/app");

beforeEach(setupDatabase)

test("Should create task for user", async () => {
    const response = await request(app)
        .post('/tasks')
        .set("Authorization", `Bearer ${user1.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test("Should read task of only user one", async () => {
    const response = await request(app)
        .get('/tasks')
        .set("Authorization", `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toEqual(2)
    
})

test("Should not delete task of user one by user two", async () => {
    const response = await request(app)
        .delete('/tasks'+task1Id)
        .set("Authorization", `Bearer ${user2.tokens[0].token}`)
        .send()
        .expect(404)

    const task = Task.findById(task1Id)
    expect(task).not.toBeNull()
})