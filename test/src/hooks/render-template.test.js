import { expect } from 'chai';
import { renderTemplate } from '../../../src/hooks';

describe('renderTemplate', () => {
  let hook; // eslint-disable-line no-unused-vars

  beforeEach(() => {
    hook = { data: {} };
  });

  describe('with invalid options', () => {
    it('throws an error when engine is missing', () => {
      try {
        renderTemplate({template: 'welcome'});
      } catch (error) {
        expect(error).to.not.equal(undefined);
      }
    });
  });

  describe('with valid options', () => {
    it.skip('returns an error when template is not provided', () => {

    });

    it.skip('returns an error when template path not found', () => {

    });

    it.skip('renders template', () => {

    });
  });
});
