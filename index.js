require('dotenv').config()

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const bodyParser = require("body-parser");


const identifyImage = require('./helpers/clarifai_helper');
const getRecipes = require('./helpers/spoonacular_helper');



app.use(bodyParser.urlencoded({extended: true, parameterLimit: 100000, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended: true}));


let time;
let cuisine; 
let numberOfRecipes;
var final = [];

app.get('/', function (req, res) {
  console.log("Made a get request within io connection")
  res.json(final);
})
app.post('/', async (req,res) => {
  console.log("Made a post request within io connection")

  // cannot destructure "interolances" as req.body.data.profileState['_55] is null -> This happens on first time of use, when a profile state has not yet been saved.
  ;  


  req.body.data.numberState['_55']===null ? numberOfRecipes =5 : numberOfRecipes = req.body.data.numberState['_55'].value;

  let intolerances;
  let pantry;
  let allergies;
  let diet;

  if (req.body.data.profileState['_55'] === null) {
    time = "Any";
    cuisine = "Any";
    intolerances=null;
    pantry=null;
    allergies=null;
    diet=null;
  } else {
    intolerances = req.body.data.profileState['_55'].intolerances
    pantry=req.body.data.profileState['_55'].pantry
    allergies=req.body.data.profileState['_55'].allergies
    diet=req.body.data.profileState['_55'].diet
  } 

  // const { intolerances, pantry, allergies, diet } = req.body.data.profileState['_55'];
  //  time = req.body.data.state.time;
  //  cuisine = req.body.data.state.cuisine;
  
  let results = await identifyImage(req.body.data.photo)
  let filtered;



  if (results === undefined) {
    filtered = [{ id: 'test',
    name: 'banana'},
    { id: 'test',
    name: 'eggs' },
    { id: 'test',
    name: 'milk' },
    { id: 'test',
    name: 'butter' }]
  } else {
    filtered = results.filter( x => x.value > 0.80 && x.name !== "vegetable" && x.name !== "relish" && x.name !== "sweet" && x.name !== "juice" && x.name !== "pasture" && x.name !== "chocolate" && x.name !== "condiment" && x.name !== "fruit" && x.name !== "citrus" && x.name !== "berry"  && x.name !== "dairy product"  && x.name !== "coffee")
  }
  


  let ingredients = [];
  for (let item of filtered) {
    ingredients.push(item.name)
  }
  let recipes = await getRecipes(process.env.SPOON_KEY, ingredients, time, cuisine, intolerances, pantry, allergies, diet, numberOfRecipes);

  let recipesArray = [];
  recipesArray.push(ingredients)

  for(const item of recipes){
    let obj = {title: item.title, time: item.readyInMinutes, missing: item.missedIngredientCount, illustration: item.image, id: item.id, instructions: item.analyzedInstructions, missedIngredients: item.missedIngredients, summary: item.summary, usedIngredients: item.usedIngredients};
    recipesArray.push(obj);
  }
  final = recipesArray;
  io.emit('message', "this is the 4th message");
})


app.post('/recipes', async (req, res) =>{

  let ingredients = req.body.data.ingredients
  console.log('THIS IS A LOG:', req.body.data.numberSettings, "THIS WAS A LOG")
  const { intolerances, pantry, allergies, diet } = req.body.data.profileSettings['_55'];
  req.body.data.numberSettings['_55']===null && req.body.data.numberSettings['_55']===undefined ? numberOfRecipes =5 : numberOfRecipes = req.body.data.numberState['_55'].value;
  // numberOfRecipes = req.body.data.numberSettings['_55'];
  let newRecipes = await getRecipes(process.env.SPOON_KEY, ingredients, time, cuisine, intolerances, pantry, allergies, diet, numberOfRecipes);

  let recipesArray = [];
  recipesArray.push(ingredients)
  for(const item of newRecipes){
    let obj = {title: item.title, time: item.readyInMinutes, missing: item.missedIngredientCount, illustration: item.image, id: item.id, instructions: item.analyzedInstructions, missedIngredients: item.missedIngredients, summary: item.summary, usedIngredients: item.usedIngredients};
    recipesArray.push(obj);
  }
  final = recipesArray;

  res.json(final)
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
