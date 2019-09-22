'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const path = require('path');

const appPortRaw = process.env.PORT;
const appPortParsed = parseInt(appPortRaw, 10);
// eslint-disable-next-line eqeqeq
const appPort = (appPortRaw == appPortParsed) ? appPortParsed : 4040;

const bodyJsonParser = bodyParser.json();
const bodyFormParser = bodyParser.urlencoded({ extended: true });

function startApp() {
  const app = express();
  const partialsPath = path.join(__dirname, 'views/partials');

  app.disable('x-powered-by');

  hbs.registerPartials(partialsPath);

  // eslint-disable-next-line no-underscore-dangle
  app.engine('hbs', hbs.__express);

  /* HBS helpers */
  hbs.registerHelper('json', (input) => {
    return JSON.stringify(input, null, 2);
  });

  hbs.registerHelper('timestampToTime', (input) => {
    const timeObject = new Date(Number(input));
    return timeObject.toISOString();
  });

  app.set('view engine', 'hbs');

  app.use('/public', express.static('public'));


  /* Routes */
  /* eslint-disable global-require */
  // UI Routes
  app.get('/', (req, res) => { return res.render('home', {
    you: { ip: req.ip, headers: req.headers }
  });
  });
  app.get('/readme', (req, res) => { return res.render('readme'); });

  // UI Actions Routes
  app.use('/actions', bodyFormParser);
  app.get('/actions/lookup/auto', require('./routes/ui/actions/lookup-auto.get'));
  app.get('/actions/lookup/ip', require('./routes/ui/actions/lookup-ip.get'));
  app.get('/actions/lookup/domain', require('./routes/ui/actions/lookup-domain.get'));
  app.get('/actions/lookup/url', require('./routes/ui/actions/lookup-url.get'));
  /* eslint-enable global-require */

  app.listen(appPort, () => {
    console.log(`Cyberpolice Lookup listening on port ${appPort}`);
  });

  return app;
}

startApp();
