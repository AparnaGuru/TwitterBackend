const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
const fs = require('fs')
const port = 3001


app.use(cors())

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
var dbo = "";


// async function main() {
//     console.log("Hi")
//     var url = "mongodb://localhost:27017/";
//     var dbo;
//     await MongoClient.connect(url, function (err, db) {
//         if (err) throw err;
//         dbo = db.db("tweetDB");
//     });
//     return dbo;
// }

app.use(bodyParser.json());

app.post('/tweet', async (req, res) => {
  //fs.appendFile(tweetJsonPath, JSON.stringify(req.body) + ",\n", err => {
  //return;
  //})
  req.body.timeStamp = new Date().getTime();
  await MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbo = db.db("tweetDB");
    dbo.collection("tweets").insertOne(req.body)
    db.close()
  })
  res.send('Success');
})

app.get('/getTweet', async (req,res) => {
  var result;
  await MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbo = db.db("tweetDB");
    result = dbo.collection("tweets").find().toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
    db.close()
  })
})
})


  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)

    //main().catch(console.error);
    //console.log('Example app listening at http://localhost:'+port)
  })