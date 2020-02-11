const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database", error);
    }

    const db = client.db(databaseName);

    // db.collection("users").deleteMany({
    //     age: 17
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection("tasks").deleteOne({
        description: "test3"
    }).then(result => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
  }
);
