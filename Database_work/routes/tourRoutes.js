const express = require ( "express")
 const tourConroller = require( "../Controller/TourController")
const router = express.Router();


 router.param( 'id', tourConroller.checkId);

router
.route("/")
.get(tourConroller.GetallTour);

router.route("/:id")
.get(tourConroller.GetTour)
.post(tourConroller.CreateTour)
.patch(tourConroller.Updatetour)
.delete(tourConroller.Deletetour)

module.exports = router ;