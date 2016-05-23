if (!global._babelPolyfill) { require('babel-polyfill'); }

import errors from 'feathers-errors';
import Sendgrid from 'sendgrid';

class Service {
  constructor(options = {}) {

    if (!options.apiKey) {
      throw new Error('Sendgrid `apiKey` needs to be provided');
    }

    this.options = options;
    this.sendgrid = new Sendgrid(options.apiKey);
    this._send = this.sendgrid.send;
  }

  create(data) {
    return new Promise((resolve, reject) => {
      data.from = data.from || this.options.from;
      
      this._validateParams(data);
      let email  = this._formatData(data);

      this._send(email, function (err, body) {
        if (err) {
          return reject(err);
        } else {
          return resolve(body);
        }
      });
    });
  }

  _validateParams(data) {
    if (!data.from) {
      throw new errors.BadRequest('`from` must be specified');
    }

    if (!data.to) {
      throw new errors.BadRequest('`to` must be specified');
    }

    if (!data.subject) {
      throw new errors.BadRequest('`subject` must be specified');
    }

    if (!data.html && !data.text) {
      throw new errors.BadRequest('`html` or `text` must be specified');
    }
  }

  // Convert array of emails to comma delimited if needed
  _formatData(data) {
    var params = {
      from: data.from,
      subject: data.subject
    };

    if(data.html) {
      params.html = data.html;
    }

    if(data.text) {
      params.text = data.text;
    }

    if (typeof data.to === 'string') {
      params.to = data.to;
    }

    var email =  new this.sendgrid.Email(params);

    if (typeof data.to === 'object') {
      data.to.forEach(function(item){
        //TODO: handle sending 1 email to multiple people using addTo(emailAddress)
        email.addSmtpapiTo(item);
      });
    }


    return email;
  }
}

export default function init(options) {
  return new Service(options);
}

init.Service = Service;