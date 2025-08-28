const Dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');

Dotenv.config({path: './config.env'});
const app = express();
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(()=>console.log('DB connection successful'));

const tour_Schema = new mongoose.Schema({
    name: { type: String, required: [true, 'tour must contain a name '] , unique:true},
    rating : {type: Number, default: 4.5},
    price:{
        type : Number,
        required:[true,"tourn must contain a price"]
    }
})

const Tour = mongoose.model('Tour', tour_Schema)