require('dotenv').config()
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .get('/', (req, res) => res.json({"pages":"index"}))
  .post('/do', (req, res)=> res.json({1:a, b:2, c:3, d:4}))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
