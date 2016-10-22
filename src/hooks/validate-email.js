'use strict';

import errors from 'feathers-errors';
import Debug from 'debug';

const debug = new Debug('feathers-sendgrid:validate-email');
const expectedFields = [
  'from',
  'to',
  'subject',
  'content'
];

export default function validateEmail () {
  return function (hook) {
    debug(`Validating hook.data`, hook.data);

    let error;

    for (let key of expectedFields) {
      if (hook.data[key] === undefined) {
        // If the recipients were specified in the personalizations ignore this key
        if (key === 'to' && hook.data.personalizations) {
          continue;
        }

        if (!error) {
          error = new errors.BadRequest('Invalid email data', { errors: {} });
        }

        error.errors[key] = `'${key}' must be specified in hook.data.`;
      }
    }

    if (error) {
      return Promise.reject(error);
    }

    return Promise.resolve(hook);
  };
}
