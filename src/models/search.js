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

    findCity = async(city) => {
        try {
            const axiosInstance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
                params: this.getParamsMapbox()
            });

            const resp = await axiosInstance.get();
            return resp.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }));
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    selectedPlaceInfo = async(id, places) => {
        places.forEach(place => {
            if(place.id === id.toString()) {
                console.log('\n');
                console.log(`${'====='.green} Selected place info: ${'====='.green}`);
                console.log(`Name: ${place.name}`);
                console.log(`Lng: ${place.lng}`);
                console.log(`Lat: ${place.lat}`);
            }
        });
    }
}

module.exports = Search;