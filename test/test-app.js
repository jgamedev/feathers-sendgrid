const feathers = require('feathers');
const service = require('../lib');

// Create the sendgrid service
const sendgridService = service({
  apiKey: 'API_KEY'
});

// Create a feathers instance with a mailer service
var app = feathers()
  .use('/mailer', sendgridService);


// Start the server.
const port = 3030;

module.exports = app.listen(port);