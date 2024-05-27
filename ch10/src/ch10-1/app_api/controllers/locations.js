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

const locationsListByDistance = async (req, res) => {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  const near = {
    type: "Point",
    coordinates: [lng, lat]
  };
  const geoOptions = {
    distanceField: "distance.calculated",
    key: 'coords',
    spherical: true,
    maxDistance: 200000,
  };
  if (!lng || !lat) {
    return res
      .status(404)
      .json({ "message": "lng and lat query parameters are required" }
      );
  }
  try {
    const results = await Loc.aggregate([
      {
        $geoNear: {
          near,
          ...geoOptions
        }
      }
    ]);
    const locations = results.map(result => {
      return {
        _id: result._id,
        name: result.name,
        address: result.address,
        rating: result.rating,
        facilities: result.facilities,
        distance: `${result.distance.calculated.toFixed()}m`
      }
    });
    res
      .status(200)
      .json(locations);
  } catch (err) {
    res
      .status(404)
      .json(err);
  }
};
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