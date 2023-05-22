const {inquirerMenu, pause} = require('./helpers/inquirer');
const Search = require('./models/search');

const main = async() => {
    let opt = '';
    const search = new Search();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                break;
            case 2:
                break;
        }

        if (opt !== '0') await pause();
    } while (opt !== '0');
}

main();