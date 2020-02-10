const mongodb = require('mongodb');
const mongodbClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

mongodbClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database', error);
    }

    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     name: 'Harshal',
    //     age: 17
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops);
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Gunther',
    //         age: 34,
    //     }, {
    //         name: 'Jane',
    //         age: 17,
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user data');
    //     }
    //     console.log(result.ops);
    // })

    db.collection('tasks').insertMany([
        {
            description: 'Testing',
            completed: true
        },
        {
            description: 'test2',
            completed: true
        },
        {
            description: 'test3',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert tasks.');
        }

        console.log(result.ops);
    })
})