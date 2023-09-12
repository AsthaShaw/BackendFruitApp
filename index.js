//Importing Express
require('dotenv').config()
const express = require('express')
const cors=require('cors')
//Create our server by calling express
const app = express() //app can be called server
//Anything above 2024 can be used as a port
//const port = 2800
const port=process.env.PORT
//process.env.PORT
//creating a route. The way it is written
//[server].[method]('<path>',callback)
//req->request, res->response
const fruits=require('./fruits.json')

//app.use('/fruits', middleware_code)//This middleware code applies 
//to anything that starts with "/fruits"
//app.use(middleware_code)

//for test middleware_code ensure next() is there otherwise the code will be stuck.

//Middleware

app.use(express.json()) //express.json() is the middleware
app.use(cors()) //no starting path as it needs to be applied to all
//instead of authentication being done in each and every route so rather set a authentication middleware 
app.get('/',(req, res)=>{
    res.send('Hello, Fruitty')
})
//route to retuen all the fruits
app.get('/fruits',(req,res)=>{
    //res.send('Return all the fruits')
    res.send(fruits)
    
})
//route to return a specific fruit
// :fruitName is a dynamic parameter

//Challenge
//Consider the case of when fruit is found and handle if the fruit is not found
//Consider how to deal with capital letters vs no capital letters
//use the name to send the fruit back to the client
app.get('/fruits/:name',(req,res)=>{
    const name=req.params.name.toLowerCase();
    //find allows to find the first match of the fruit
    const fruit=fruits.find(fruit=>fruit.name.toLowerCase()==name)
   // const fruit=fruits.filter(fruit=>fruit.name.toLowerCase()==name)
    console.log(fruit)
 //if(fruit){
    if(fruit==undefined){
        res.status(404).send("The Fruit does not exist")

    }else{
        res.send(fruit)
    }

    
   
    //res.send(`Returns a specific fruit with name ${req.params.name}`)
    //console.log(req.params.name)
    //res.send(`Returns a specific fruit with name ${req.params.name}`)
})

// Add a new piece of fruit 
app.post('/fruits', (req, res)=>{
    const fruitReq= req.body; //need to be parsed as it is a string. 
    //We will use express.json so that we can work with this as an object.
   console.log(fruitReq.name.toLowerCase())//
    const fruitName=fruits.find(fruit=>fruit.name.toLowerCase()==fruitReq.name.toLowerCase())
    console.log("fruitName"+fruitName)
    let ids=fruits.map(fruit=>fruit.id);
    console.log("ids::"+ids)
   console.log(Math.max(...ids));//..creating a copy of the array //??not working
  const newFruitId=Math.max(...ids)+1;
    req.body.id=newFruitId
    console.log(newFruitId)
  
    if(fruitName==undefined){
        
        fruits.push(fruitReq)
        res.status(201).send(fruitReq)
        //res.status(200).send(newFruit)
    }else{
        res.status(409).send("The Fruit exists!! So you cannot add it.")
    }
    //res.send("New Fruit created")

})
// app.get('/', (req, res) => {
//   //res.send('Hello World!')
//   res.status(200).send({"name":"Astha"})
//   //sometimes you just send statuscode and no data
//   res.sendStatus(200);
// })
// Bind server to the port
//app.listen(<port>,()=>{})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//localhost:3000 ->server url