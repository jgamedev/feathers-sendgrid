import {expect} from 'chai';
import {validateEmail} from '../../../src/hooks';

describe('validateEmail', () => {
  let hook;

  beforeEach(() => {
    hook = {data: {}};
  });

  describe('when fields are missing', () => {
    it('returns a BadRequest error', (done) => {
      validateEmail()(hook).then(hook => {
        // should never get here
        expect(hook).to.equal(undefined);
        done();
      })
        .catch(error => {
          expect(error.code).to.equal(400);
          done();
        });
    });

    it('highlights missing key in errors object', (done) => {
      validateEmail()(hook).then(hook => {
        // should never get here
        expect(hook).to.equal(undefined);
        done();
      })
        .catch(error => {
          expect(error.errors.from).to.not.equal(undefined);
          done();
        });
    });
  });

  describe('when all fields are present', () => {
    it('returns original hook', (done) => {
      hook.data = {
        to: 'user@example.com',
        from: 'me@example.com',
        subject: 'Hi',
        content: 'Hello'
      };

      validateEmail()(hook).then(hook => {
        expect(hook).to.deep.equal(hook);
        done();
      });
    });
  });

  describe('when to is missing but personalizations are present', () => {
    it('returns original hook', (done) => {
      hook.data = {
        personalizations: [{to: []}],
        from: 'me@example.com',
        subject: 'Hi',
        content: 'Hello'
      };

      validateEmail()(hook).then(hook => {
        expect(hook).to.deep.equal(hook);
        done();
      }).catch(done);
    });
  });
});
