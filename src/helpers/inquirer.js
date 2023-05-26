const inquirer = require('inquirer');
const { type } = require('os');
const { resolve } = require('path');
const { async } = require('rxjs');
const { option } = require('yargs');
require('colors');

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: '1',
                name: `${'1'.green}. Find city`
            }, 
            {
                value: '2',
                name: `${'2'.green}. History`
            }, 
            {
                value: '0',
                name: `${'0'.green}. Exit\n`
            }
        ]
    }
]

const inquirerMenu = async() => {        
    console.clear();

    console.log('=========================='.green);        
    console.log(`${'|'.green}    Select an option    ${'|'.green}`);
    console.log('=========================='.green);

    const {option} = await inquirer.prompt(menuOpts);

    return option;
}

const pause = async(option) => {
    const question = [
        {
            type: 'input',
            name: 'ENTER',
            message: `Press ${'ENTER'.green} to continue`
        }
    ];

    console.log(`\n`)
    await inquirer.prompt(question);

    return option;
}

const readInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if(value.length === 0) {
                    return 'Please enter a value';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);

    return desc;
}

const matchPlaces = async(places = []) => {
    const matchingPlaces = places.map((place, i) => {
        const index = `${i + 1}. `.green;

        return {
            value: place.id,
            name: `${index} ${place.name}`
        }
    });

    matchingPlaces.unshift ({
        value: '0',
        name: '0.'.green + ' Cancel'
    });

    const matchPlacesList = [
        {
            type: 'list',
            name: 'id',
            message: 'Select: ',
            choices: matchingPlaces
        }
    ];

    const {id} = await inquirer.prompt(matchPlacesList);

    return id;
}

const confirm = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);

    return ok;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    matchPlaces,
    confirm,
}