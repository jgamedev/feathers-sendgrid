import { expect } from 'chai';
import { renderTemplate } from '../../../src/hooks';

describe.only('renderTemplate', () => {
  let hook;

  beforeEach(() => {
    hook = { data: {} };
  });

  describe('with invalid options', () => {
    it('throws an error when engine is missing', () => {
      try {
        renderTemplate({ template: 'welcome'});
      }
      catch(error) {
        expect(error).to.not.equal(undefined);
      }
    });
  });

  describe('with valid options', () => {
    it('returns an error when template is not provided', () => {
      
    });

    it('returns an error when template path not found', () => {
      
    });

    it('renders template', () => {
      
    });
  });
});
