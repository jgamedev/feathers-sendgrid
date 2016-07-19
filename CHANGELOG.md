# Change Log

## v0.2.0

- **Breaking changes errrwhere!**
- Adding more tests
- Dropping [sendgrid](https://github.com/sendgrid/sendgrid-nodejs) module due to complexity and instability. Switching to Request instead.
- Upgrading to Sendgrid API v3
- Adding hooks:
    -  for rendering a template file
    -  validating email params when sending
    -  normalizing params for easy sending

## v0.1.0

- Initial Release