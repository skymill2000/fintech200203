const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/home', function (req, res) {
    res.send('home page')
})

app.get('/member', function (req, res) {
    res.send('member page')
})
  

app.listen(3000)