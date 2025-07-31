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
  app.get('/api/v1/destinations/:id',(req,res)=>{
    
    const ID = req.params.id * 1;  // it convert any number into int by multiplying by 1
     if(ID > dest.length){
      return res.status(404).json({
        status:'fail',
        message:"invalid id "
      })
    };
    const ndest = dest.find( el => el.id ===ID) ;

    res.status(200).json({
        status: 'success',
        data : {
           ndest
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
 app.patch('/api/v1/destinations/:id',(req,res)=>{
  res.status(200).json({
    status: 'success',
    data: {
      dest: '<updated destination here>'
    }
  })
 })

 app.delete('/api/v1/destinations/:id',(req,res)=>{
   if ( req.params.id*1 > dest.length){
    return res.status(404).json({
      status:'fail',
      message:"invalid"
    })
   }
   // 204 means no content
   res.status(204).json({
    status: 'success',
    data:null,
   })
 })

  const port  = 3000;
  app.listen (port,()=>{
    console.log(`server is running on port ${port}`);
    
  })