const mongoose = require('mongoose');
const Loc = mongoose.model('Location');


const locationReadOne = (req, res) => {
  Loc.findById(req.params.locationid)
    .exec((err, location)=>{
      if(!location){
        return res
          .status(404)
          .json({"message":"location not found"});
      }else if(err){
        return res
          .status(404)
          .json(err);
      }
      res.status(200)   
        .json(location)
      console.log("findById complete");
    });
};

const locationsListByDistance = (req, res) => {};
const locationCreate = (req, res) => {};
const locationUpdateOne = (req, res) => {};
const locationsDeleteOne = (req, res) => {};

module.exports = {
  locationsListByDistance,
  locationCreate,
  locationReadOne,
  locationUpdateOne,
  locationsDeleteOne
};