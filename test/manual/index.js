const inquirer = require('inquirer');
const confirmValidated = require('../../index');

inquirer.registerPrompt('confirm-validated', confirmValidated);

inquirer.prompt({
    type: 'confirm-validated',
    name: 'test',
    message: 'Does it work?',
    defaultValue : false,
    showDefault : true,
    validate(input) {
        
        // if(input === false) {
        //     return 'No This will not let you go ahead, unless you pass y';
        // }
        return true;
    }
});
