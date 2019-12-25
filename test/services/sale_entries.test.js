const app = require('../../src/app');

describe('\'sale_entries\' service', () => {
  it('registered the service', () => {
    const service = app.service('sale_entries');
    expect(service).toBeTruthy();
  });
});
