require("dotenv").config();
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
//console.log(MAPBOX_ACCESS_TOKEN);
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: MAPBOX_ACCESS_TOKEN });
//console.log(geocodingClient);

// get the place name ________________________________
geocodingClient
.forwardGeocode({
    query: "SJ"
})
.send()
.then(response=>{
    const match = response.body;
    //console.log(match); 

    const features = match.features;
    //console.log(features);

    features.forEach(eachPlace=>{
        //console.log(eachPlace.place_name);
        let city = eachPlace.place_name.split(", ", [0]);
        let state = eachPlace.place_name.split(", ", [1]);
        console.log(city);
        console.log(state);
    })
});

//get the coordinates _______________________________________
// geocodingClient
// .forwardGeocode({
//     query: "San Francisco, CA"
// })
// .send()
// .then(response=>{
//     const match = response.body;
//     let firstFeatureCoord = match.features[0].center;

//     console.log(firstFeatureCoord);
// })

//reverse geocode  ________________________________________
// geocodingClient
// .reverseGeocode({
//     query: [ -122.463, 37.7648 ]
// })
// .send()
// .then(response=>{
//     const match = response.body;

//     console.log(match);
// })