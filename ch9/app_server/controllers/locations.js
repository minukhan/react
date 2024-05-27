// GET 'home' page
const homelist = (req, res) => {
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!',
    },
    sidebar:
      "Looking for wifi and a seat? Loc8r helps you find places to work \
    when out and about. Perhaps with coffee, cake or a pint? \
    Let Loc8r help you find the place you're looking for.",
    locations: [
      {
        name: 'Starcups',
        address: '서울특별시 관악구 호암로 100',
        rating: 3,
        facilities: ['Hot drinks', 'Food', 'Preminum wifi'],
        distance: '12.1km',
      },
      {
        name: 'Cafe Hero',
        address: '서울특별시 관악구 호암로 300',
        rating: 4,
        facilities: ['Hot drinks', 'Food', 'Preminum wifi'],
        distance: '3.1km',
      },
      {
        name: 'gs25',
        address: '서울특별시 관악구 삼성동 1100',
        rating: 3,
        facilities: ['Hot drinks', 'Food', 'Power'],
        distance: '3.9km',
      },
      {
        name: 'Burger Queen',
        address: '서울특별시 관악구 봉천동 남부순환로 1934',
        rating: 2,
        facilities: ['Food', 'Preminum wifi'],
        distance: '9.8km',
      },
    ],
  });
};

// GET 'Location info' page
const locationInfo = (req, res) => {
  res.render('location-info', {
    title: 'Starcups',
    pageHeader: {
      title: 'Loc8r',
    },
    sidebar: {
      context:
        'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callToAction:
        "If you've been and you like it - or if you don't - please leave a review to help other people just like you.",
    },
    location: {
      name: 'Starcups',
      address: '서울특별시 관악구 호암로 100',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      coords: { lat: 37.011448, lng: 127.264005 },
      openingTimes: [
        {
          days: 'Monday - Friday',
          opening: '7:00am',
          closing: '7:00pm',
          closed: false,
        },
        {
          days: 'Saturday',
          opening: '8:00am',
          closing: '5:00pm',
          closed: false,
        },
        {
          days: 'Sunday',
          closed: true,
        },
      ],
      reviews: [
        {
          author: '2019250059 한민욱',
          rating: 5,
          timestamp: '16 July 2013',
          reviewText:
            "What a great place. I can't say enough good things about it.",
        },
        {
          author: 'Charlie Chaplin',
          rating: 3,
          timestamp: '16 June 2013',
          reviewText:
            "It was okay. Coffee wasn't great, but the wifi was fast.",
        },
      ],
    },
  });
};

// GET 'Add review' page
const addReview = (req, res) => {
  res.render('location-review-form', {
    title: 'Review Starcups on Loc8r',
    pageHeader: { title: 'Review Starcups' },
  });
};

module.exports = {
  homelist,
  locationInfo,
  addReview,
};
