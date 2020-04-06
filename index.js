'use strict';

const chalk = require('chalk');
const { takeUntil } = require('rxjs/operators');
const Confirm = require('inquirer/lib/prompts/confirm');
const observe = require('inquirer/lib/utils/events');

module.exports = class ConfirmValidated extends Confirm {
  constructor(questions, rl, answers) {
    
    super(questions, rl, answers);
    
    let defaultValue = this.opt.defaultValue;
    if(defaultValue === undefined){
      defaultValue = this.opt.default;
    }

    this.opt = Object.assign({},
      {
        showDefault : true,
        defaultValue : true,
      }, this.opt,
      {
        filter: function(input) {

          if (typeof input === 'boolean') {
            return input;
          }
          let value = defaultValue;
          if (input != null && input !== '') {

            value = /^y(es)?/i.test(input);
          }
          return value;
      }
    });
  }

  _run(cb) {

    this.done = cb;
    const events = observe(this.rl);
    const validation = this.handleSubmitEvents(events.line);

    validation.success.forEach(this.onEnd.bind(this));
    validation.error.forEach(this.onError.bind(this));
    events.keypress.pipe(takeUntil(validation.success))
        .forEach(this.onKeypress.bind(this));

    this.render();
    return this;
  }

  render(answer, error) {
    
    let message = this.getQuestion();

    let bottomContent;

    if (typeof answer === 'boolean') {
      message += chalk.cyan(answer ? 'Yes' : 'No');
    } else {

      if (typeof this.opt.defaultValue === 'boolean' && this.opt.showDefault) {
        message += chalk.dim( `(${this.opt.defaultValue}) `);
      }
  
      message += this.rl.line;
    }
    if (error) {
      bottomContent = chalk.red('>> ') + error;
    }

    this.screen.render(message, bottomContent);
    return this;
  }

  onError(state) {
    this.render(null, state.isValid);
  }

  onEnd(state) {
    const output = this.opt.filter(state.value);
    this.status = 'answered';
    this.render(output);
    this.screen.done();
    this.done(output);
  }
};
