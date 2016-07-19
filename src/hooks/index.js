import renderTemplate from './render-template';
import normalizeEmail from './normalize-email';
import sendEmail from './send-email';
import validateEmail from './validate-email';

const hooks = {
  renderTemplate,
  normalizeEmail,
  sendEmail,
  validateEmail
};
export default hooks;
