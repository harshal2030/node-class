const path = require('path');
const express = require('express');
const hbs = require('hbs');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

// define paths for express
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup HandleBars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Harshal Sanghvi"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: "Harshal Sanghvi"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        name: "Harshal Sanghvi"
    })
})

app.get('/weather', (req, res) => {
    res.send({
        "forecast": "27c",
        "location": "fasdfas",
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        error: "help article not found",
        name: "Harshal Sanghvi"
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        error: "Page not found",
        name: "Harshal Sanghvi"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})