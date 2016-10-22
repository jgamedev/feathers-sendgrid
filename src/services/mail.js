import errors from 'feathers-errors';
import request from 'request';
import Debug from 'debug';

const debug = new Debug('feathers-sendgrid:mail');

const SENDGRID_API = 'https://api.sendgrid.com/v3';

export class MailService {
  constructor (options = {}) {
    if (!options.apiKey) {
      throw new Error('Sendgrid `apiKey` needs to be provided');
    }

    this.options = options;
  }

  create (data) {
    return new Promise((resolve, reject) => {
      const options = {
        url: `${SENDGRID_API}/mail/send`,
        method: 'POST',
        json: true,
        headers: {
          'User-Agent': 'feathers-sendgrid',
          'Authorization': `Bearer ${this.options.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: data
      };

      debug(`Sending request`, options);

      request(options, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        error = errors[response.statusCode];

        if (error) {
          return reject(new Error('Error sending email to Sendgrid', body));
        }

        resolve({ sent: true });
      });
    });
  }
}

export default function (options) {
  debug(`Configuring Sendgrid Mail service with options:`, options);

  return new MailService(options);
}
