const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
const port = 3001
const MongoClient = require('mongodb').MongoClient;
const { request } = require('http');
// const jwt = require('jsonwebtoken');

const url = "mongodb://localhost:27017/";
var dbo;
// const secretKey="abcde12345!";

app.use(cors())
app.use(bodyParser.json());


main()
async function main() {
  var url = "mongodb://localhost:27017/";
  await MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbo = db.db('tweetDB');
    console.log(dbo)
  })
  console.log(dbo)
}

app.post('/tweet', async (req, res) => {
  req.body.tweetValues.timeStamp = new Date().getTime();
  dbo.collection("tweets").insertOne(req.body)
  res.send('Success');
})

// app.post('/auth', async (req, res) => {
//   var jwtResult;
//   if (req.body.username == "Aparna" && req.body.pw=="Sahasra") {
//     jwtResult = jwt.sign(username, secretKey, { expiresIn: '1800s' });
//   }
//   res.send(jwtResult);
// })

app.get('/getTweet', async (req, res) => {
  dbo.collection("tweets").find().toArray(function (err, result) {
    if (err) throw err;
    res.send(result);
  })
})

app.post('/verifyLogin', async (req, res) => {
  console.log(req.body)
  var count= await dbo.collection("users").find((req.body)).count()
  console.log(count)
  //toArray(function (err, result) {
  //  if (err) throw err;
  //  res.send(result);
  if (count >0 ){
    console.log("hi")
    res.send({"message": "success"})
  }
  else {
  res.send({"message": "failure"})
  }
  })

app.post('/createUser', async (req, res) => {
  //const cred = [{userName:req.body.userName, passWord:req.body.passWord}]   
  dbo.collection("users").insertOne(req.body)
  res.send('Success');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})