import { expect } from 'chai';
import { normalizeEmail } from '../../../src/hooks';

describe('normalizeEmail', () => {
  let hook;

  beforeEach(() => {
    hook = { data: {} };
  });

  describe('to field', () => {
    it('removes key from data', (done) => {
      hook.data.to = 'user@example.com';

      normalizeEmail()(hook).then(hook => {
        expect(hook.data.to).to.equal(undefined);
        done();
      }).catch(done);
    });

    describe('when it is a string', () => {
      it('converts to list of personalizations', (done) => {
        hook.data.to = 'user@example.com';

        normalizeEmail()(hook).then(hook => {
          expect(hook.data.personalizations[0].to[0]).to.deep.equal({email: 'user@example.com'});
          done();
        }).catch(done);
      });
    });

    describe('when it is an array of strings', () => {
      it('converts to list of personalizations', (done) => {
        hook.data.to = ['user1@example.com', 'user2@example.com'];

        normalizeEmail()(hook).then(hook => {
          expect(hook.data.personalizations[0].to[0]).to.deep.equal({email: 'user1@example.com'});
          expect(hook.data.personalizations[0].to[1]).to.deep.equal({email: 'user2@example.com'});
          done();
        }).catch(done);
      });
    });

    describe('when it is an array of objects', () => {
      it('converts to list of personalizations', (done) => {
        hook.data.to = [
          {email: 'user1@example.com', name: 'user1'},
          {email: 'user2@example.com', name: 'user2'}
        ];

        normalizeEmail()(hook).then(hook => {
          expect(hook.data.personalizations[0].to[0]).to.deep.equal({email: 'user1@example.com', name: 'user1'});
          expect(hook.data.personalizations[0].to[1]).to.deep.equal({email: 'user2@example.com', name: 'user2'});
          done();
        }).catch(done);
      });
    });
  });

  describe('from field', () => {
    describe('when it is a string', () => {
      it('converts to an object', (done) => {
        hook.data.from = 'user@example.com';

        normalizeEmail()(hook).then(hook => {
          expect(hook.data.from).to.deep.equal({ email: 'user@example.com' });
          done();
        }).catch(done);
      });
    });

    describe('when it is an object', () => {
      it('returns an object', (done) => {
        hook.data.from = { email: 'user@example.com', name: 'user' };

        normalizeEmail()(hook).then(hook => {
          expect(hook.data.from).to.deep.equal({ email: 'user@example.com', name: 'user' });
          done();
        }).catch(done);
      });
    });
  });

  describe('reply_to field', () => {
    describe('when it is a string', () => {
      it('converts to an object', (done) => {
        hook.data.reply_to = 'user@example.com';

        normalizeEmail()(hook).then(hook => {
          expect(hook.data.reply_to).to.deep.equal({ email: 'user@example.com' });
          done();
        }).catch(done);
      });
    });

    describe('when it is an object', () => {
      it('returns an object', (done) => {
        hook.data.reply_to = { email: 'user@example.com', name: 'user' };

        normalizeEmail()(hook).then(hook => {
          expect(hook.data.reply_to).to.deep.equal({ email: 'user@example.com', name: 'user' });
          done();
        }).catch(done);
      });
    });
  });

  describe('content field', () => {
    describe('when it is a string', () => {
      it('converts to an array with an object', (done) => {
        hook.data.content = 'hello';

        normalizeEmail()(hook).then(hook => {
          expect(hook.data.content[0]).to.deep.equal({ type: 'text/html', value: 'hello' });
          done();
        }).catch(done);
      });
    });
  });

  describe('when personalizations are present', () => {
    it('returns the original', (done) => {
      const expected = [
        {
          to: [{ email: 'user@example.com' }],
          cc: [{ email: 'me@example.com' }]
        }
      ];

      hook.data.personalizations = expected;

      normalizeEmail()(hook).then(hook => {
        expect(hook.data.personalizations).to.deep.equal(expected);
        done();
      }).catch(done);
    });
  });

  describe('when additional fields are present', () => {
    it('returns them', (done) => {
      hook.data.subject = 'Hello';

      normalizeEmail()(hook).then(hook => {
        expect(hook.data.subject).to.equal('Hello');
        done();
      }).catch(done);
    });
  });
});
