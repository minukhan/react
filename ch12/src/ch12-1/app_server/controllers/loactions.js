const { response } = require('express');
var request = require('request');

const apiOptions = {
  server: 'http://localhost:3000'
};

if(process.env.NODE_ENV === 'production'){
  apiOptions.server = 'https://loc8rv2.herokuapp.com';
}

const homelist = (req, res) => {
  const path = '/api/locations';
  const requestOptions = {
    url : `${apiOptions.server}${path}`,
    method : 'GET',
    json: {},
    qs : {
      lng : 126.964062,
      lat : 37.468769,
      maxDistance : 200000
    }
  };
  request(
    requestOptions,
    (err,response,body) => {
      renderHompage(req,res,body);
    }
  );
};
  
const renderHompage = (req,res,responseBody) =>{
  res.render('location-list',
      {
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
          title: 'Loc8r',
          strapLine: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        locations: responseBody
      }
    );
}
  const locationInfo = (req, res) => {
    res.render('location-info',
      {
        title: 'Starcups',
         pageHeader: {
          title: 'Loc8r',
        },
        sidebar: {
          context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
          callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: {
          name: 'Starcups',
          address: '경기도 안성시 중앙로 327',
          rating: 3,
          facilities: ['Hot drinks', 'Food', 'Premium wifi'],
          coords: {lat: 37.0113415, lng: 127.262962},
          openingTimes: [
            {
              days: 'Monday - Friday',
              opening: '7:00am',
              closing: '7:00pm',
              closed: false
            },
            {
              days: 'Saturday',
              opening: '8:00am',
              closing: '5:00pm',
              closed: false
            },
            {
              days: 'Sunday',
              closed: true
            }
          ],
          reviews: [
            {
              author: 'Simon Holmes',
              rating: 5,
              timestamp: '16 July 2013',
              reviewText: 'What a great place. I can\'t say enough good things about it.'
            },
            {
              author: 'Charlie Chaplin',
              rating: 3,
              timestamp: '16 June 2013',
              reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
            }
          ]
        }
      }
    );
  };
  
  const addReview = (req, res) => {
    res.render('location-review-form',
      {
        title: 'Review Starcups on Loc8r' ,
        pageHeader: { title: 'Review Starcups' }
      }
    );
  };
  
  module.exports = {
    homelist,
    locationInfo,
    addReview
  };