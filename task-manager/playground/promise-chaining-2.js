require('./../src/db/mongoose');
const Task = require('./../src/models/tasks')

// Task.findByIdAndRemove('5e46dedb634c80219f9a16c4').then((res) => {
//     console.log(res)
//     return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const DeleteAndCount = async (id) => {
    const del = await Task.findByIdAndDelete('5e47d04186b828187a8b1c30')
    const count = await Task.countDocuments({completed: false});

    return count
}

DeleteAndCount('5e47d04186b828187a8b1c30').then((count) => {
    console.log(count)
}).catch((e) => console.log(e))