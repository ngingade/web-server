const request = require('request');

const foreCast = (lat, lon, callBack) => {
    const url = `http://api.weatherstack.com/current?access_key=e96f585c553159ef0ff7ed65c792fafa&query=${lat},${lon}&units=f`;

    request({ url: url, json:true }, (error, resposnse) => {
    //  const data = (resposnse.body.features[0].properties);
        if(error) {
            const errorMessage = 'Unable to reach internet, please try again later';
            callBack(errorMessage, undefined);
        } else if(resposnse && resposnse.body.error) {
            const errorMessage = 'Error in finding longitude and latitude';
            callBack(errorMessage, undefined);
        } else {
            const {weather_descriptions, temperature, feelslike, weather_icons} = (resposnse.body.current);
            const locateMessage =  weather_descriptions + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out.';
            callBack(undefined, {locateMessage, weather_icons: weather_icons[0]});
        }
    })
}


module.exports = foreCast;