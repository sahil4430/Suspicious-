const fs= require('fs');
const Tour = JSON.parse(fs.readFileSync(`${__dirname}/../../data/tour.json`));
exports.checkId = (req, res, val , next ) =>{
    console.log (`your ${val}`);
    if(req.params.id *1 > Tour.length){
        return res.status(404).json(
            {
                status :"fail",
                message : "invaild id",
            }
        )
    }next() 
};

exports.GetallTour = (req,res) =>{
    res.status(200).json({
        status:" sucess",
        result: `number of data is ${Tour.length}`,
        data:{Tour}
    })
};

exports.GetTour =( req,res) =>{
    const id = req.params.id *1 ;
    const tour = Tour.find( el => el.id ===id);
    res.status(200).json({
        status:"success",
        data:{
            tour
        }
    })
}
exports.CreateTour =(req,res) =>{
const newID = Tour(Tour.length -1).id+1
const newtour = Object.assign({id: newID}, req.body);
Tour.push(newTour);
fs.writeFile(
    `${__dirname}/../../data/tour.json`,
    JSON.stringify(Tour),
    err =>{
        res.status(201).json({
            status: "created",
            data: newtour,
        })
    }
)
}

exports.Updatetour =(req, res)=>{
    res.status(200).json({
        status:"done"
    })
}
exports.Deletetour =(req, res)=>{
    res.status(200).json({
        status:"done"
    })
}