const axios = require('axios');

class Search {
    constructor (history) {

    }

    async findCity (city = '') {

        try {
            const axiosInstance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
                params: {
                    limit:5,
                    language:en,
                    access_token:'pk.eyJ1Ijoic2VyZ2lvbWlyIiwiYSI6ImNsaHpoaHU1dzE2bnMzZW80ZnlwN2doYWEifQ.GXoiSvtdM8CCdcRic2nACQ'
                }
            });

            const resp = await axiosInstance.get();
            console.log(resp)
        } catch (error) {
            return [];
        }
    }

}

module.exports = Search;