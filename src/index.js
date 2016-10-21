if (!global._babelPolyfill) { require('babel-polyfill'); }

import mail from './services/mail';
import h from './hooks';

export const hooks = h;

export const MailService = mail;
// TODO (EK): Add more services for the sendgrid API

export default mail;
