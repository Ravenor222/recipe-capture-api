require('dotenv').config()
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .get('/', (req, res) => res.json({"pages":"index"}))
  .post('/do', (req, res)=> res.send(process.env.SPOON_KEY))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
