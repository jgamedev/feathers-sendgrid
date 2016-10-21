import {expect} from 'chai';
import sendgrid, {hooks, MailService} from '../../src';

describe('Feathers Sendgrid', () => {
  it('is CommonJS compatible', () => {
    expect(typeof require('../../lib')).to.equal('object');
  });

  it('is ES6 compatible', () => {
    expect(typeof sendgrid).to.equal('function');
  });

  it('exposes hooks', () => {
    expect(typeof hooks).to.equal('object');
  });

  it('exposes MailService', () => {
    expect(typeof MailService).to.equal('function');
  });
});
