const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=7e6463c691077e5e16d4145547663f49&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";
  // console.log(url);
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      //console.log(error);
      callback("Something went wrong", undefined);
    } else if (body.error) {
      // console.log(body.error);
      callback("Something went wrong", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions +
          " it is currently " +
          body.current.temperature +
          " degress out \n<br>. It feels like " + body.current.feelslike + " There is " +
          body.current.precip +
          " % chance of rain , "
          + " Is it a day out there ?  " + body.current.is_day
      );
    }
  });
};

module.exports = forecast;
