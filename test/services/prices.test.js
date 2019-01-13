const app = require('../../src/app');

describe('\'prices\' service', () => {
  it('registered the service', () => {
    const service = app.service('prices');
    expect(service).toBeTruthy();
  });
});
