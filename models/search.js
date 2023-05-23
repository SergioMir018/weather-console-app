const axios = require('axios');

class Search {
    constructor (history) {

    }

    async findCity (city = '') {

        try {
            const axiosInstance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
                params: {
                    access_token: 'pk.eyJ1Ijoic2VyZ2lvbWlyIiwiYSI6ImNsaHpoODY0cTE2NXgza2xiamVieWR4dHMifQ.8Vi2Vcp6RXShOJjzG9b08A',
                    limit: 5,
                    language: es
                }
            });

            const resp = await axiosInstance.get();
            console.log(resp.data)
        } catch (error) {
            return [];
        }
    }

}

module.exports = Search;