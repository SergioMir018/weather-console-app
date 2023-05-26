const axios = require('axios');

class Search {
    constructor (history) {

    }

    getParamsMapbox() {
        return  {
            limit: 5,
            language: 'en',
            access_token: process.env.MAPBOX_KEY
        }
    }

    getParamsOpenWeather() {
        return {
            units: 'metric',
            appid: process.env.OPEN_WEATHER
        }
    }

    findCity = async(city) => {
        try {
            const axiosMapInstance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
                params: this.getParamsMapbox()
            });

            const resp = await axiosMapInstance.get();
            return resp.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1],
            }));
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    placeWeather = async(lat, lon) => {

        try {
            const axiosWeatherInstance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {...this.getParamsOpenWeather(), lat, lon,}
            });

            const resp = await axiosWeatherInstance.get();
            const {weather, main} = resp.data;

            return {
                desc: weather[0].description,
                avgTemp: main.temp,
                minTemp: main.temp_min,
                maxTemp: main.temp_max,
                humidity: main.humidity
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Search;