const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const foreCast = require('./utils/foreCast');

const app = express();
// console.log(path.join(__dirname, '../public'));
// console.log(__filename);

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));


// app.get('', (req, res) => {
//     res.send('Hello express');   
// })

// app.get('/help', (req, res) => {
//     res.send('This is help page');

// })

// app.get('/about', (req,res) => {
//     // res.send('<h1>This is about page</h1>')
// app.use(express.static(aboutDirectory))

// })

// app.get('/weather', (req, res) => {
//     // res.send({
//     //     temp: 30,
//     //     Report: 'Sunny'
//     // });

// app.use(express.static(weatherDirectory))

// })

app.get('', (req, res) => {
    res.render('index', {
        'title': 'Index.html',
        'footer': 'This is index footer'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'About.html',
        'footer': 'This is About footer'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        'title': 'help.html',
        'footer': 'This is help footer'
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        'title': '404.html',
        'footer': 'This is 404 footer',
        'errorMessage': 'No data found from help'
    })
})

app.get('/weather', (req, res) => {
    console.log(req.query.address);
    if(!req.query.address) {
        return res.send({
            'error': 'Address was not set'
        })
    }

    // To get the Location and weather details from API
    geoCode(req.query.address, (error, data) => {  /* Callback function */
        if(error) {
            return res.send({error})
        }
        
        const { lat, lon } = data;
        foreCast(lat,lon, (foreCastError, foreCastData) => {  /* Callback function */
            if(foreCastError) {
                return res.send({ foreCastError })
            }
            console.log(foreCastData);
            res.send({ lat, lon, foreCastData })
        });

    });

})

app.get('*', (req, res) => {
    res.render('404', {
        'title': '404.html',
        'footer': 'This is 404 footer',
        'errorMessage': 'No data found'
    })
})

app.listen('3000', () => {
    console.log('Listening to port 3000');
})
