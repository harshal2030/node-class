require('./../src/db/mongoose');
const Task = require('./../src/models/tasks')

Task.findByIdAndRemove('5e46dedb634c80219f9a16c4').then((res) => {
    console.log(res)
    return Task.countDocuments({completed: false})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})