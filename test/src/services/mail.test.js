// import chai from 'chai';
// import { expect } from 'chai';
// import assert from 'assert';
// import sinon from 'sinon';
// import sinonChai from 'sinon-chai';

// chai.use(sinonChai);

// import feathers from 'feathers';

// import server from './test-app';
// import service from '../src';

// import Sendgrid from 'sendgrid';
// const sendgrid = new Sendgrid('API_KEY');

// const sendgridService = service({apiKey: 'API_KEY'});
// const app = feathers().use('/mailer', sendgridService);

// const validParams = {
//   from: 'from@from.com',
//   to: 'to@to.com',
//   subject: 'Email Subject',
//   html: 'message html'
// };

// const validParamsWithArrayInToField = {
//   from: 'from@from.com',
//   to: ['to@to.com', 'to2@to.com'],
//   subject: 'Email Subject',
//   html: 'message html'
// };

// describe('Sendgrid Service', function () {

//   after(done => server.close(() => done()));

//   describe('Initialization', () => {

//     describe('without an api key', () => {
//       it('throws an error', () => {
//         expect(service.bind(null, {})).to.throw('Sendgrid `apiKey` needs to be provided');
//       });
//     });
//   });

//   describe('Validation', () => {

//     describe('when missing `from` field', () => {
//       it('throws an error', (done) => {
//         app.service('mailer').create({}).then(done).catch(err => {
//           assert.equal(err.code, 400);
//           assert.equal(err.message, '`from` must be specified');
//           done();
//         });
//       });
//     });

//     describe('when missing `to` field', () => {
//       it('throws an error', (done) => {
//         app.service('mailer').create({from: 'from@from.com'}).then(done).catch(err => {
//           assert.equal(err.code, 400);
//           assert.equal(err.message, '`to` must be specified');
//           done();
//         });
//       });
//     });

//     describe('when missing `subject` field', () => {
//       it('throws an error', (done) => {
//         app.service('mailer').create({from: 'from@from.com', to: 'to@to.com'}).then(done).catch(err => {
//           assert.equal(err.code, 400);
//           assert.equal(err.message, '`subject` must be specified');
//           done();
//         });
//       });
//     });

//     describe('when missing `html` field', () => {
//       it('throws an error', (done) => {
//         app.service('mailer').create({
//           from: 'from@from.com',
//           to: 'to@to.com',
//           subject: 'Email Subject'
//         }).then(done).catch(err => {
//           assert.equal(err.code, 400);
//           assert.equal(err.message, '`html` or `text` must be specified');
//           done();
//         });
//       });
//     });
//   });

//   describe('Sending messages', () => {

//     var sendgridSend;
//     beforeEach(function (done) {
//       sendgridSend =
//       sinon
//         .stub(app.service('mailer'), '_send', function (data, callback) {
//           callback(null, {success: true});
//         });
//       done();
//     });

//     afterEach(function (done) {
//       sendgridSend.restore();
//       done();
//     });

//     describe('when sending to an array of email addresses', () => {

//       it('correctly adds them to email', (done) => {

//         var email =  new sendgrid.Email({from: validParamsWithArrayInToField.from, html: validParamsWithArrayInToField.html, subject: validParamsWithArrayInToField.subject});
//         email.addSmtpapiTo('to@to.com');
//         email.addSmtpapiTo('to2@to.com');

//         app.service('mailer').create(validParamsWithArrayInToField).then(result => {
//           expect(result.success).to.eql(true);
//           expect(sendgridSend).to.have.been.calledWith(email);
//           done();
//         });
//       });
//     });

//     describe('when all fields are valid', () => {
//       it('successfully sends a message', (done) => {
//         app.service('mailer').create(validParams).then(result => {
//           expect(result.success).to.eql(true);
//           var email =  new sendgrid.Email(validParams);
//           expect(sendgridSend).to.have.been.calledWith(email);
//           done();
//         });
//       });
//     });

//   });

//   describe('Common functionality', () => {
//     it('is CommonJS compatible', () => {
//       assert.ok(typeof require('../lib') === 'function');
//     });
//   });

// });
