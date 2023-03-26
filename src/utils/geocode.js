const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoia3Jpc2huYW5ha2t1bXdoeW5vdCIsImEiOiJjbGI3ejUyemYwZnRnM3lueG40dWI0dHl6In0._H3I4NvsHa6SDTqABxviyQ&limit=1";

  request({ url: url, json: true }, (error, {body}) => {
    if (error) {
      callback("Somethig went wrong", undefined);
    } else if (body.features.length === 0) {
      callback("Something went wrong", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
