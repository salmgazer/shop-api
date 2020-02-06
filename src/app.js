const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');


const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');
const SyncService = require('./services/SyncService');

const knex = require('./knex');

const authentication = require('./authentication');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true,limit: '50mb' }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));


const tables = [
  'users',
  'companies',
  'brands',
  'categories',
  'products',
  'customers',
  'sales',
  'sale_entries',
  'users_companies',
  'expense_categories',
  'expenses',
  'settings',
  'product_prices',
  'installments'
];


app.use('/ping', async (req, res) => {
  res.status(200).json({ message: 'pong' });
});

app.use('/pull_changes', async (req, res) => {
  let lastPulledAt = req.query.last_pulled_at;
  if (lastPulledAt) {
    lastPulledAt = parseInt(lastPulledAt, 10);
  }

  const company_id = req.query.company_id;

  // get changes here
  const allChanges = {};
  for (let i = 0; i < tables.length; i++) {
    await SyncService.sendTableChangesToClient(allChanges, tables[i], lastPulledAt, company_id);
  }
  console.log(allChanges);
  res.status(200).json({ changes: allChanges, timestamp: Date.now()});
});


app.post('/push_changes', async (req, res) => {
  const lastPulledAt = req.query.last_pulled_at;
  const changes = req.body;

  for (let i = 0; i < tables.length; i++) {
    const currentTableName = tables[i];
    await SyncService.applyTableChangesFromClient(changes[currentTableName], currentTableName, lastPulledAt);
  }
  res.status(200).send('Success');
});


// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(knex);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));


app.hooks(appHooks);

module.exports = app;
