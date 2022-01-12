const express = require('express')
const app = express()
const port = 3001

app.get('/hello/:name', (req, res) => {
  console.log(req.params.name)
  res.send('Hello World!' + req.params.name)
})
app.get('/hello1', (req, res) => {
  res.send('Voila World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})