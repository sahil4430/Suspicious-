 const { exec } = require('child_process');
const express = require('express');
 const  fs = require ('fs');
 const app = express();
 const Morgan= require('morgan');
const dest = JSON.parse(fs.readFileSync(`${__dirname}/../data/destination.json`));


app.use(Morgan('dev'));// this is a middleware to log the request details in the console
         app.use(express.json());     // this is use as a midleware to parse JSON bodies

 //Customise midlware 
  app.use((req,res,next)=>{
     req.Time = new Date().toISOString();
    next()
  })
  // this is a simple midleware to log the request time this is executed before the request handler 

 const Getalldest= (req,res)=>{
  console.log(req.Time)
    res.status(200).json({
        
        status: 'success',
        executionTime: req.Time,
        result:dest.length,
        data : {
           dest
        }
  });
};
const GetDest= (req,res)=>{

    const ID = req.params.id * 1;   // it convert any number into int by multiplying by 1
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
}; 

// 201 means created successfully
 const POSTDest = (req,res)=>{
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
 };

 const UpdateDest = (req,res)=>{
  res.status(200).json({
    status: 'success',
    data: {
      dest: '<updated destination here>'
    }
  })
 };

 const DeleteDest = (req,res)=>{
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
 };

 // routes. 

//traditional way
// app.get('/api/v1/destinations',Getalldest);
//   app.get('/api/v1/destinations/:id', GetDest);
//  app.post('/api/v1/destinations', POSTDest)
//  app.patch('/api/v1/destinations/:id', UpdateDest)
//  app.delete('/api/v1/destinations/:id', DeleteDest)

 app.route('/api/v1/destinations').get(Getalldest).post(POSTDest);
 app.route ('/api/v1/destinations/:id').get(GetDest).patch(UpdateDest).delete(DeleteDest);
  // this is the server
  const port  = 3000;
  app.listen (port,()=>{
    console.log(`server is running on port ${port}`);
    
  })