const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const reviewsCreate = (req, res) => {};
const reviewsReadOne = (req, res) => {
    Loc.findById(req.params.locationid)
        .select('name reviews')
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

            function findObjectById(array, id) {
                for (let i = 0; i < array.length; i++) {
                    if (array[i]._id === id) {
                        return array[i];
                    }
                }
                return null;
            }

            const location_parsed = JSON.parse(JSON.stringify(location));
            if(location_parsed.reviews && location_parsed.reviews.length > 0){
                const review = findObjectById(location_parsed.reviews, req.params.reviewid);

                if(!review){
                    return res
                    .status(404)
                    .json({"message":"review not found"});
                }else{
                    const response = {
                        location : {
                            location : location.name,
                            id : req.params.locationid
                        },
                        review
                    };
                    return res
                        .status(200)
                        .json(response);
                }
            }else{
                return res
                .status(404)
                .json({"message":"No reviews found"});
            }
        });
};
const reviewsUpdateOne = (req, res) => {};
const reviewsDeleteOne = (req, res) => {};  

module.exports = {
    reviewsCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne
};