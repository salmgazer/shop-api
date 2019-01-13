const app = require('../../src/app');

describe('\'brands\' service', () => {
  it('registered the service', () => {
    const service = app.service('brands');
    expect(service).toBeTruthy();
  });
});
