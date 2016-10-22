'use strict';

import merge from 'lodash.merge';
import Debug from 'debug';

const debug = new Debug('feathers-sendgrid:send-email');

const defaults = {
  mailerEndpoint: '/mailer',
  emailField: 'email',
  template: {}
};

module.exports = function sendEmail (options = {}) {
  return function (hook) {
    options = Object.assign({}, defaults, hook.app.get('mailer'), options);

    debug('sendEmail called with options', options);

    let template = merge(hook.params.template, options.template);

    if (hook.type === 'before') {
      template.data = Object.assign({}, hook.data, template.data);
    } else if (hook.type === 'after') {
      let result = hook.result;

      // Handle Mongoose Models
      if (hook.result.toObject) {
        result = hook.result.toObject();
      } else if (hook.result.toJSON) {
        // Handle Sequelize Models
        result = hook.result.toJSON();
      }

      template.data = Object.assign({}, result, template.data);
    }

    // Attempt to get the email field from our data
    const recipient = template.data[options.emailField];
    const data = Object.assign({}, options);
    const params = Object.assign({}, hook.params, { template });

    // If a recipient wasn't already provided and we found one
    // in our data then let's use that one.
    if (recipient && (!data.to || !data.personalizations)) {
      data.to = recipient;
    }

    // Clean up some of our keys that shouldn't be passed on.
    delete data.mailerEndpoint;
    delete data.emailField;
    delete data.template;

    debug(`Calling app.service(${options.mailerEndpoint}).create with data`, data);
    debug(`Calling app.service(${options.mailerEndpoint}).create with params`, params);

    return new Promise((resolve, reject) => {
      hook.app.service(options.mailerEndpoint)
        .create(data, params)
        .then(() => {
          // return the original hook
          resolve(hook);
        })
        .catch(reject);
    });
  };
};
