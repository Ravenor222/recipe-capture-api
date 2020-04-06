require('dotenv').config()
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .get('/', (req, res) => res.json({"pages":"index"}))
  .get('/recipes', (req, res) => res.send("good luck"))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
