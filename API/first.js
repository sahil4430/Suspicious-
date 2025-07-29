 const express = require('express');
 const  fs = require ('fs');
 const app = express();
const dest = JSON.parse(fs.readFileSync(`${__dirname}/../data/destination.json`));


  app.get('/api/v1/destinations',(req,res)=>{
    res.status(200).json({
        status: 'success',
        result:dest.length,
        data : {
           dest
        }
  });
});


  const port  = 3000;
  app.listen (port,()=>{
    console.log(`server is running on port ${port}`);
    
  })