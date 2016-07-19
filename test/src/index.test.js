/*jshint expr: true*/

import { expect } from 'chai';
import sendgrid from '../../src';
import { hooks } from '../../src';
import { MailService } from '../../src';

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
