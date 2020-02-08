const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "https://api.darksky.net/forecast/0919bf6869822ff66d24464d3cf699c2/" +
    lat +
    "," +
    long +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather sevice", undefined);
    } else if (body.error) {
      console.log(body.error);
      callback("unable to fetch weather for given location", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degrees out. There is " +
          body.currently.precipProbability +
          "% chance of rain"
      );
    }
  });
};

module.exports = forecast;
