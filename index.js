require('dotenv').config()
const app = require('express')
const PORT = process.env.PORT || 5000
const io = require("socket.io").listen(app);

const example = {
  examples:"thing"
}


app.get('/', (req, res) => res.json({"pages":"index"}))
  // .post('/', (req, res) => res.json(example))
  // .post('/do', (req, res)=> {
  //   res.json({"pages":"do"})
  // })
  // .listen(PORT, () => console.log(`Listening on ${ PORT }`))


//  app()
//   .get('/', (req, res) => res.json({"pages":"index"}))
//   .post('/', (req, res) => res.json(example))
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// server.listen(PORT, () => console.log("server running on port:" + PORT));
