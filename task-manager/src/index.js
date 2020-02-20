const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/tasks');
const userRouter = require('./router/user');
const taskRouter = require('./router/task');

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter);

app.listen(port, () => {
    console.log("Server listening on ", + port);
})