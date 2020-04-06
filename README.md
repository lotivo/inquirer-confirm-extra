
# Inquirer confirm with extras

A plugin for [Inquirer](https://github.com/SBoudrias/Inquirer.js), adding validation, default to the confirm prompt.

Basically a regular confirm with regular options of prompt implemented.

## Options

**validate** (Function) : Function for validation same as normal prompt validation function

**defaultValue** (Boolean | true) : Default value for prompt

**showDefault** (Boolean | true) : show default value with question

## Example Usage

```js
inquirer.registerPrompt('confirm-validated', require('inquirer-confirm-extra'));

inquirer.prompt({
  type: 'confirm-validated',
  defaultValue: false,
  validate(val, answers) {
    if (!val) {
      return "Sorry, We can't do that";
    }
    return true;
  },
  ...
});
```

## Inspiration

This package is built upon existing package [inquirer-confirm-validated](https://www.npmjs.com/package/inquirer-confirm-validated), it's good except it only has validation implemented.

It also hasn't been updated since 2 years and there was no repo link or I would have sent PR.

## Contribution

Feel free to send PR for adding extra options