const feathers = require('feathers');
const rest = require('feathers-rest');
const hooks = require('feathers-hooks');
const socketio = require('feathers-socketio');
const bodyParser = require('body-parser');
const errorHandler = require('feathers-errors/handler');
const MailService = require('../lib').MailService;
const mailerHooks = require('../lib').hooks;

// Create a feathers instance.
var app = feathers()
  // Enable REST services
  .configure(rest())
  // Enable hooks
  .configure(hooks())
  // Enable Socket.io services
  .configure(socketio())
  // Turn on JSON parser for REST services
  .use(bodyParser.json())
  // Turn on URL-encoded parser for REST services
  .use(bodyParser.urlencoded({extended: true}));

app.use('/mailer', MailService({ apiKey: 'API_KEY' }));

app.service('mailer').before({
  create: [mailerHooks.validateEmail(), mailerHooks.normalizeEmail()]
});

// Send an email!
app.service('mailer').create({
  from: 'hello@feathersjs.com',
  to: 'example@sendgrid.com',
  subject: 'Sendgrid test',
  content: 'Email body'
}).then(function (result) {
  console.log('Sent email', result);
}).catch(error => {
  console.log(error);
});

app.use(errorHandler());

// Start the server.
const port = 3030;

app.listen(port, function () {
  console.log(`Feathers server listening on port ${port}`);
});
