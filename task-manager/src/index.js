const express = require('express');
require('./db/mongoose');
const userRouter = require('./router/user');
const taskRouter = require('./router/task');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter);

app.listen(port, () => {
    console.log("Server listening on ", + port);
})

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewlearningpath', {expiresIn: '7 days'})
    console.log(token)

    const data = jwt.verify(token, 'thisismynewlearningpath');
    console.log(data)
}

myFunction();