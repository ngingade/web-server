const request = require('request');

const geoCode = (place, callBack) => {
    const addressUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(place)}&apiKey=8223d175d0464cc6b988b32738e257e7&limit=1`;
    request({url: addressUrl, json: true}, (error, resposnse) => {
        const {body} = resposnse;
        if(error) {

            const errorMessage = 'Unable to reach internet, please try again later';
            callBack(errorMessage, undefined);

        } else if(resposnse && body.features.length === 0) {

            const errorMessage = 'Could not find the location. Please try different location';
            callBack(errorMessage, undefined);

        } else {
            // const data = (resposnse.body.features[0].properties);
            // const locateMessage = `${place} Longitute is ${data.lon} and Latituted id ${data.lat}`;
            // callBack(undefined, locateMessage);

            const data = (body.features[0].properties);
            callBack(undefined, data);
            
        }
    })
}

module.exports = geoCode;