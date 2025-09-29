 const mongoose = require ('mongooses');
const tour_Schema = new mongoose.Schema({
    name: { type: String, required: [true, 'tour must contain a name '] , unique:true},
    rating : {type: Number, default: 4.5},
    price:{
        type : Number,
        required:[true,"tourn must contain a price"],
        
    }
})
const Tour = mongoose.model('Tour', tour_Schema)

module.exports = Tour;
 const mongoose = require('mongoose');
 const tour_schema = new mongoose.schema({
    name: {}
 })