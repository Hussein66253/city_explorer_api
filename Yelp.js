'use strict'
const superagent = require('superagent');

/////////yelp route


function yelphandler(req, res) {
    let key = process.env.YELP_API_KEY;
    // let lan =
    // let lon =
    const city = req.query.search_query;
    const url = `https://api.yelp.com/v3/businesses/search?location=${city}`
    superagent.get(url)
        .set({ "Authorization": `Bearer ${key}` })
        .then(req => {
            const yelp2 = req.body.businesses.map((val) => {
                return new Yelp(val);
            });
            res.status(200).json(yelp2);
        });
}


//// Yelp constrctor 


function Yelp(val) {
    this.name = val.name;
    this.url = val.url;
    this.price = val.price;
    this.rating = val.rating;
    this.image_url = `http://s3-media4.fl.yelpcdn.com/bphoto/6He-NlZrAv2mDV-yg6jW3g/o.jpg`;//// need to fix it

}

//// yelp export to server.js

module.exports = yelphandler;