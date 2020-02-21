const express = require('express');
require('./db/mongoose');
const userRouter = require('./router/user');
const taskRouter = require('./router/task');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter);

app.listen(port, () => {
    console.log("Server listening on ", + port);
})

const myFunction = async () => {
    const password = 'Red12234!';
    const hashedPassword = await bcrypt.hash(password, 8);

    console.log(password);
    console.log(hashedPassword);

    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log(isMatch);
}

myFunction();