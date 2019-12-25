const app = require('../../src/app');

describe('\'companies\' service', () => {
  it('registered the service', () => {
    const service = app.service('companies');
    expect(service).toBeTruthy();
  });
});
