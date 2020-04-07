require('dotenv').config()

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true, parameterLimit: 100000, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended: true}));

io.on("connection", socket => {
  console.log("a user connected ;D");

})


app.get('/', (req,res)=> {
  res.json({"hello":"sir"})
})






server.listen(process.env.PORT || 3000);
















// app()
// .get('/', (req, res) => res.json({"pages":"index"}))
  // .post('/', (req, res) => res.json(example))
  // .post('/do', (req, res)=> {
  //   res.json({"pages":"do"})
  // })
  // .listen(PORT, () => console.log(`Listening on ${ PORT }`))


//  app()
//   .get('/', (req, res) => res.json({"pages":"index"}))
//   .post('/', (req, res) => res.json(example))
// .listen(PORT, () => console.log(`Listening on ${PORT}`));

// server.listen(PORT, () => console.log("server running on port:" + PORT));
