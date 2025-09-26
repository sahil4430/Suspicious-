
const express = require('express');
const app = express();
const Routes = require('./Database_work/routes/tourRoutes.js');

app.use('/api/v1/tours',Routes);
const port = 3000;
app.listen( port,()=>{
    console.log(`server is running on port ${port}`);

})