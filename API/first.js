 const express = require('express');
 const  fs = require ('fs');
 const app = express();
const dest = JSON.parse(fs.readFileSync(`${__dirname}/../data/destination.json`));

 app.use(express.json());  // this ius use as a midlw ware to parse JSON bodies
  app.get('/api/v1/destinations',(req,res)=>{
    res.status(200).json({
        status: 'success',
        result:dest.length,
        data : {
           dest
        }
  });
});
 app.post('/api/v1/destinations',(req,res)=>{
  const NEW_ID = dest[dest.length -1].id + 1;
  const ne_dest = Object.assign({id: NEW_ID}, req.body); // this will create a new object with the new id and the body of the request
  //  const ne_dest = req.body;
   dest.push(ne_dest);
   fs.writeFile(`${__dirname}/../data/destination.json`, JSON.stringify(dest), err =>{
    res.status(201).json({
      status:'success',
      data: {
        dest: ne_dest
      }
    })
   })
 })


  const port  = 3000;
  app.listen (port,()=>{
    console.log(`server is running on port ${port}`);
    
  })