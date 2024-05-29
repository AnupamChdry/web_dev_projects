const { MongoClient } = require("mongodb");
const assert = require('assert');

// Replace the uri string with your connection string.
const url = "mongodb://localhost:27017";

const dbName = 'fruitsProject';

const client = new MongoClient(url);

client.connect(function(err){
    assert.equal(NULL,err);
    console.log('connected successfully to sever');

    const db = client.db(dbName);
    client.close;
})



// async function run() {
//   try {
//     const database = client.db('sample_mflix');
//     const movies = database.collection('movies');

//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query);

//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);