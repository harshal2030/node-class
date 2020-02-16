const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/tasks');

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.post('/tasks', (req, res) => {
    const task = Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.listen(port, () => {
    console.log("Server listening on ", + port);
})