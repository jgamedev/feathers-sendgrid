'use strict';

// import { mail as helper } from 'sendgrid';
import Debug from 'debug';

const debug = new Debug('feathers-sendgrid:normalize-email');

export default function normalizeEmail () {
  return function (hook) {
    debug(`Normalizing hook.data`, hook.data);

    let data = Object.assign({}, hook.data);
    let recipients = [];

    if (typeof data.to === 'string') {
      recipients = [{ email: data.to }];
    } else if (Array.isArray(data.to)) { // Support batch sending
      recipients = data.to.map(recipient => {
        // Handle array of emails (ie. ['user1@domain.com', 'user2@domain.com'])
        return typeof recipient === 'string' ? { email: recipient } : recipient;
      });
    }

    data.personalizations = data.personalizations || [{ to: recipients }];
    delete data.to;

    if (typeof data.from === 'string') {
      data.from = { email: data.from };
    }

    if (typeof data.reply_to === 'string') {
      data.reply_to = { email: data.reply_to };
    }

    if (typeof data.content === 'string') {
      const type = data.type || 'text/html';
      data.content = [{ type, value: data.content }];
      delete data.type;
    }

    hook.data = Object.assign({}, data);

    return Promise.resolve(hook);
  };
}
