const customers = require('./customers/customers.service.js');
const products = require('./products/products.service.js');
const categories = require('./categories/categories.service.js');
const sales = require('./sales/sales.service.js');
const users = require('./users/users.service.js');
const brands = require('./brands/brands.service.js');
const companies = require('./companies/companies.service.js');
const saleEntries = require('./sale_entries/sale_entries.service.js');
const usersCompanies = require('./users_companies/users_companies.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(customers);
  app.configure(products);
  app.configure(categories);
  app.configure(sales);
  app.configure(users);
  app.configure(brands);
  app.configure(companies);
  app.configure(saleEntries);
  app.configure(usersCompanies);
};
