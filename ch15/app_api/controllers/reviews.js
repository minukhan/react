const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const doSetAverageRating = (location) => {
    if (location.reviews && location.reviews.length > 0) {
        const count = location.reviews.length;
        const total = location.reviews.reduce((acc, {rating}) => {
            return acc + rating;
        }, 0);
        location.rating = parseInt(total / count, 10); // 평균 등급 값을 계산하여 parent 다큐먼트의 등급값을 갱신
        location.save(err => {
            if (err){ //parent 다큐먼트 저장
                console.log(err);
            } else {
                console.log(`Average rating updated to ${location.rating}`);
            }
        });
    }
};
const updateAverageRating = (locationId) => { //제공된 locationid 데이터에 기반하여 locatiomn 검색
    Loc.findById(locationId)
        .select('rating reviews')
        .exec((err, location) => {
            if (err) { // 에러가 발생한 경우
                console.error(err); // 에러 메시지를 출력하고 처리
            } else {
                doSetAverageRating(location); // 에러가 없는 경우 정상 처리
            }
        });
};
const doAddReview = (req, res, location) => {
    if (!location) {
        res
            .status(404)
            .json({"message": "Location not found"});
    } else {
        const {author, rating, reviewText} = req.body;
        location.reviews.push({
            author,
            rating,
            reviewText
        });
        location.save((err, location) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                updateAverageRating(location._id);
                let thisReview = location.reviews[location.reviews.length - 1];
                res
                    .status(201)
                    .json(thisReview);
            }
        });
    }
};

const reviewsCreate = (req, res) => {
    const locationId = req.params.locationid;
    if(locationId) {
        Loc
            .findById(locationId)
            .select('reviews')
            .exec((err, location) =>{
                if(err) {
                    res
                        .status(400)
                        .json(err);
                } else {
                    doAddReview(req, res, location);
                }
            });
    } else {
        res
            .status(404)
            .json({"message": "Location not found"});
    }
};

const reviewsReadOne = (req, res) => {
    Loc
        .findById(req.params.locationid)
        .select('name reviews')
        .exec((err, location) => {
            if(!location) {
                return res
                .status(404)
                .json({
                    "message": "location not found"
                });
            } else if (err) {
              return res
                .status(400)
                .json(err);
            }

            if (location.reviews && location.reviews.length > 0) {
                const review = location.reviews.id(req.params.reviewid);

                if(!review) {
                    return res
                        .status(404)
                        .json({"message" : "review not found"});
                } else {
                    const response = {
                        location : {
                            name: location.name,
                            id: req.params.locationid
                        },
                        review
                    };

                    return res
                        .status(200)
                        .json(response);
                }
            } else {
                return res
                    .status(404)
                    .json({"message": "No reviews found"});
                            
            }
            
        });
};
const reviewsUpdateOne = (req, res) => {
    if (!req.params.locationid || !req.params.reviewid){
        return res
            .status(404)
            .json({
                "message": "Not fount, locationid and reviewid are both required"
            });
    }
    Loc
        .findById(req.params.locationid)
        .select('reviews')
        .exec((err, location) => {
            if (!location) {
                return res
                    .status(404)
                    .json({
                        "message": "Location not found"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            if (location.reviews && location.reviews.length > 0) {
                const thisReview = location.reviews.id(req.params.reviewid);
                if (!thisReview) {
                    res
                        .status(404)
                        .json({
                            "message": "Review not found"
                        });
                } else {
                    thisReview.author = req.body.author;
                    thisReview.rating = req.body.rating;
                    thisReview.reviewText = req.body.reviewText;
                    location.save((err, loc) => {
                        if (err) {
                            res
                                .status(404)
                                .json(err);
                        } else {
                            updateAverageRating(location._id);
                            res
                                .status(200)
                                .json(thisReview);
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({
                        "message": "no Review to update"
                    });
            }
        }
    ); 
};


const reviewsDeleteOne = (req, res) => {
    const {locationid, reviewid} = req.params;
    if (!locationid || !reviewid) {
        return res
            .status(404)
            .json({'message': 'Not found, locationid and \
            reviewid are both required'});
    }
    Loc
        .findById(locationid)
        .select('reviews')
        .exec((err, location) => {
            if (!location) {
                return res
                    .status(404)
                    .json({'message': 'Location not found'});
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            if (location.reviews && location.reviews.length > 0) {
                if(!location.reviews.id(reviewid)) {
                    return res
                        .status(404)
                        .json({'message': 'Review not found'});
                } else {
                    location.reviews.id(reviewid).remove();
                    location.save(err => {
                        if(err) {
                            return res
                                .status(404)
                                .json(err)
                        } else {
                            updateAverageRating(location._id);
                            res
                                .status(204)
                                .json(null);
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({'message': 'No review to delete'});
            }
        });
};

module.exports = {
    reviewsCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne
};