const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database', error);
    }

    const db = client.db(databaseName);

    // db.collection('users').findOne({_id: new ObjectID("5e419fc8f7848a1625ccc842")}, (error, user) => {
    //     if (error) {
    //         return console.log('unable to fetch');
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({age: 17}).count((error, users) => {
    //     console.log(users);
    // })

    db.collection('tasks').findOne({_id: new ObjectID("5e41a43c93b1081d3d957b64")}, (error, result) => {
        if (error) {
            return console.log('error')
        }

        console.log(result);
    })

    db.collection('tasks').find({completed: true}).toArray((error, result) => {
        console.log(result);
    })
})