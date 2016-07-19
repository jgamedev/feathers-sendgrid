import { expect } from 'chai';
import hooks from '../../../src/hooks';

describe('Sendgrid hooks', () => {
  it('is CommonJS compatible', () => {
    expect(typeof require('../../../lib/hooks')).to.equal('object');
  });

  it('is ES6 compatible', () => {
    expect(typeof hooks).to.equal('object');
  });

  it('exposes normalizeEmail hook', () => {
    expect(typeof hooks.normalizeEmail).to.equal('function');
  });

  it('exposes validateEmail hook', () => {
    expect(typeof hooks.validateEmail).to.equal('function');
  });

  it('exposes renderTemplate hook', () => {
    expect(typeof hooks.renderTemplate).to.equal('function');
  });
});
