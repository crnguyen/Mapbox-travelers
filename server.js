require("dotenv").config();
let express = require('express')
let app = express()
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
//console.log(MAPBOX_ACCESS_TOKEN);
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: MAPBOX_ACCESS_TOKEN });
let ejsLayouts = require('express-ejs-layouts')
const methodOverride = require("method-override") //require method override


app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static("static"));
app.use(methodOverride("_method")) //initialize method override

app.get('/', (req, res)=>{
  res.render('home')
})

app.get("/search", (req,res)=>{
  const searchInput = {
    city: req.body.city,
    state: req.body.state
  };
  geocodingClient
.forwardGeocode({
    query: `${searchInput.city}, ${searchInput.state}`
})
.send()
.then(response=>{
    const match = response.body;
    //console.log(match); 

    const features = match.features;
    //console.log(features);

    let firstCity = features[0];
    let coord = firstCity.center;
    let city = firstCity.place_name.split(", ",) [0];
    let state = firstCity.place_name.split(", ",) [1];

    res.render("results");

    const location = {
      city: city,
      state: state,
      lat: coord[0],
      long: coord[1]
    };

    res.render("results", { location });

    // features.forEach(eachPlace=>{
    //     //console.log(eachPlace.place_name);
  
    //     console.log(city);
    //     console.log(state);
    // });
});

});

app.listen(process.env.PORT || 8000, console.log('🎧 Port 8000 🎧'))