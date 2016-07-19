# feathers-sendgrid

> A [SendGrid](https://sendgrid.com) Service for [FeatherJS](https://github.com/feathersjs).


[![Build Status](https://travis-ci.org/feathersjs/feathers-sendgrid.png?branch=master)](https://travis-ci.org/feathersjs/feathers-sendgrid)

**So far this only supports sending email. If you'd like additional functionality PRs are welcome! :smile:** 

## Installation

```bash
npm install feathers-sendgrid --save
```

## Documentation

`feathers-sendgrid` is used just like any other service. In order to send an email simply call `create` with a payload that conforms to the [Sendgrid V3 REST API](https://sendgrid.com/docs/API_Reference/Web_API_v3/Mail/index.html#-Request-Body-Parameters). You can see [an example payload here](https://github.com/sendgrid/sendgrid-nodejs/blob/master/USAGE.md#post-mailsend).

For usage with some of the bundled hooks see the example below. 

## Bundled Hooks

This module comes with a couple bundled hooks that make it a bit easier to send email. These are **entirely optional**.

### Rendering Email Templates

This hook renders a specific email `template` based on your express view `engine` with your `hook` object. It is meant to be used as a `before` hook on the a `create` method.

```js
const Handlebars = require('hbs');
const hooks = require('feathers-sendgrid').hooks;

app.service('mailer').before({
  create: [
    hooks.renderTemplate({ engine:  Handlebars })
  ]
});

function sendEmail(options = {}) {
  return function(hook) {
    return new Promise((resolve, reject) => {
      hooks.renderTemplate({template: 'welcome', engine: Handlebars })(hook)
        .then(hook => {
          const data = {
            from: 'hello@feathersjs.com',
            to: hook.result.email,
            subject: 'Welcome',
            content: hook.data.content
          };

          hook.app.service('mailer')
            .create(data, {template: 'welcome'})
            .then()
        })
    });
  };
}

app.service('users').after({
  create: [
    sendEmail()
  ]
});
```

#### Options

- `engine` (**required**) - the view engine instance.
- `template` (**required**) - the name of your template.
- `path` [optional] - path to your email template directory. Defaults to your express view engine path + 'email' (ie. path/to/views/email/).

### Validating Email Params

This hook validates that the following fields exist inside `hook.data`:

- `from`
- `to` or `personalizations`
- `subject`
- `content`

It is really loose validation since Sendgrid does it's own validation. This is more for ensuring that the absolute minimum fields are included in order to send an email.

```js
const hooks = require('feathers-sendgrid').hooks;

app.service('mailer').before({
  create: [
    hooks.validateEmail()
  ]
});
```

### Normalizing Email Params

This hook makes it a bit less tedious to send simple emails. It takes a simple flat format and turns it into the format that Sendgrid expects. It only effects the following fields in `hook.data`:

- `from`
- `to`
- `subject`
- `content`

```js
const hooks = require('feathers-sendgrid').hooks;

app.service('mailer').before({
  create: [
    hooks.normalizeEmail()
  ]
});
```

## Complete Example

Here's an example of a Feathers server with a `mailer` Sendgrid service.

```js
import rest = from 'feathers-rest';
import hooks from 'feathers-hooks';
import feathers from 'feathers';
import bodyParser from 'body-parser';
import { MailService, hooks as mailerHooks } from 'feathers-sendgrid';

// Create a feathers instance.
var app = feathers()
  // Enable REST services
  .configure(rest())
  // Enable hooks
  .configure(hooks())
  // Turn on JSON parser for REST services
  .use(bodyParser.json())
  // Turn on URL-encoded parser for REST services
  .use(bodyParser.urlencoded({extended: true}));

// Register the Sendgrid service
app.use('/mailer', MailService({ apiKey: "YOUR_SENDGRID_API_KEY" }));

app.service('mailer').before({
  create: [mailerHooks.validateEmail(), mailerHooks.normalizeEmail()]
});

// Use the service
var email = {
   from: 'FROM_EMAIL',
   to: 'TO_EMAIL',
   subject: 'Sendgrid test',
   content: 'This is the email body'
};

app.service('mailer').create(email).then(function (result) {
  console.log('Sent email', result);
}).catch(err => {
  console.log(err);
});

// Start the server.
var port = 3030;
app.listen(port, function() {
  console.log(`Feathers server listening on port ${port}`);
});
```

You can run this example by using `npm start`. Make sure you've added your Sendgrid API token.

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
