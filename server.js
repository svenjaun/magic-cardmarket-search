const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const fs = require('fs');

app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.post('/', (req, res) => {
  console.log(req.body.name, req.body.priceTrend);
  fs.appendFile('data.json', JSON.stringify(req.body) + ",\n", 'utf8',
    (err) => {
      if (err) throw err;
    });
  res.send("OK")

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})