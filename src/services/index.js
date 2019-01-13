const customers = require('./customers/customers.service.js');
const products = require('./products/products.service.js');
const categories = require('./categories/categories.service.js');
const sales = require('./sales/sales.service.js');
const users = require('./users/users.service.js');
const prices = require('./prices/prices.service.js');
const brands = require('./brands/brands.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(customers);
  app.configure(products);
  app.configure(categories);
  app.configure(sales);
  app.configure(users);
  app.configure(prices);
  app.configure(brands);
};
