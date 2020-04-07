require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 5000
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

const example = {
  examples:"thing"
}

// express()



  // .get('/', (req, res) => res.json({"pages":"index"}))
  // .post('/', (req, res) => res.json(example))
  // .post('/do', (req, res)=> {
  //   res.json({"pages":"do"})
  // })
  // .listen(PORT, () => console.log(`Listening on ${ PORT }`))


//  app()
//   .get('/', (req, res) => res.json({"pages":"index"}))
//   .post('/', (req, res) => res.json(example))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));


const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));