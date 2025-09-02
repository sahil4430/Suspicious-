const Dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const Tour = require('./MODELS/tourmodel');

Dotenv.config({path: './config.env'});
const app = express();
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(()=>console.log('DB connection successful'));


const testTour = new Tour({
    name: 'The Park Camper',
    price: 997 
})

testTour.save().then(doc=>{
    console.log(doc)
})
.catch( err =>{
    console.log(' erroe us this here it is. ', err)
})

console.log(process.env);
const Morgan = require('morgan');
app.use(Morgan('dev'));
const port = 3000;
app.listen( port,()=>{
    console.log(`server is running on port ${port}`);

})