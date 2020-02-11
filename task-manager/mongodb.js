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

    db.collection("users").updateOne(
      { _id: new ObjectID("5e41a1644a05cc18e3dcc4a1") },
      {
        $set: {
          name: "Mike"
        }
      }
    ).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error)
    })
  }
);
