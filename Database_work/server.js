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
