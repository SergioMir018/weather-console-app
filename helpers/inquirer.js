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

const listDeletingTask = async(tasks = []) => {
    const choices = tasks.map((task, i) => {
        const index = `${i + 1}. `.green;

        return {
            value: task.id,
            name: `${index} ${task.desc}`
        }
    });

    choices.unshift ({
        value: '0',
        name: '0.'.green + ' Cancel'
    });

    const deleteList = [
        {
            type: 'checkbox',
            name: 'id',
            message: 'Delete',
            choices
        }
    ];

    const {id} = await inquirer.prompt(deleteList);

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

const completeTasksCheck = async(tasks = []) => {
    const choices = tasks
                        .filter(task => !task.completed)
                        .map((task, i) => {
                            const index = `${i + 1}. `.green;

                            return {
                                value: task.id,
                                name: `${index} ${task.desc}`,
                                checked: false
                            }
                        });

    choices.unshift ({
        value: '0',
        name: '0.'.green + ' Cancel'
    });

    const completeList = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices
        }
    ];

    const {ids} = await inquirer.prompt(completeList);

    return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listDeletingTask,
    confirm,
    completeTasksCheck
}