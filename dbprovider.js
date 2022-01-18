var MongoClient = require('mongodb').MongoClient;

async function main() {
    console.log("Hi")
    var url = "mongodb://localhost:27017/";
    var dbo;
    await MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        dbo = db.db("tweetDB");
    });
    return dbo;
}