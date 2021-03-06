const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();

// define paths for express
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup HandleBars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Harshal Sanghvi"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Harshal Sanghvi"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Harshal Sanghvi"
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You  must provide the address"
    });
  } else {
    geoCode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({error})
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({error})
        }

        return res.send({
            forecast: forecastData,
            location: location,
            address: address,
        })
      });
    });
  }
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Your must provide a search term."
    });
  }

  console.log(req.query);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("notfound", {
    error: "help article not found",
    name: "Harshal Sanghvi"
  });
});

app.get("*", (req, res) => {
  res.render("notfound", {
    error: "Page not found",
    name: "Harshal Sanghvi"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
