const app = require('../../src/app');

describe('\'users_companies\' service', () => {
  it('registered the service', () => {
    const service = app.service('users-companies');
    expect(service).toBeTruthy();
  });
});
