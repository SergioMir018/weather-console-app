require('dotenv').config();

const {inquirerMenu, pause, readInput, matchPlaces} = require('./helpers/inquirer');
const Search = require('./models/search');

const main = async() => {
    let opt = '';
    const search = new Search();

    search.loadDB();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const city = await readInput('City: ');
                
                if (city) {
                    const data = await search.findCity(city);
                    const selectedPlace = await matchPlaces(data);
                    
                    if(selectedPlace === '0') continue;
                    
                    const foundPlace = data.find( place => place.id === selectedPlace);

                    search.addToHistory(foundPlace.name);

                    const weather = await search.placeWeather(foundPlace.lat, foundPlace.lng);

                    console.clear();
                    console.log('\n');
                    console.log(`${'====='.green} Selected place info: ${'====='.   green}`);
                    console.log(`Name: ${foundPlace.name}`);
                    console.log(`Lng: ${foundPlace.lng}`);
                    console.log(`Lat: ${foundPlace.lat}`);
                    console.log(`Avg Temp: ${weather.avgTemp}`);
                    console.log(`Min Temp: ${weather.minTemp}`);
                    console.log(`Max Temp: ${weather.maxTemp}`);
                    console.log(`Humidity: ${weather.humidity}`);
                    console.log(`Current Weather: ${weather.desc}`);
                }
                break;
            case '2':
                search.history.forEach((place, i) => {
                    const indx = `${i + 1}.`.green;
                    console.log(`${indx} ${place}`);
                });
                break;
        }

        if (opt !== '0') await pause();
    } while (opt !== '0');
}

main();