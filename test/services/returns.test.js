const app = require('../../src/app');

describe('\'returns\' service', () => {
  it('registered the service', () => {
    const service = app.service('returns');
    expect(service).toBeTruthy();
  });
});
