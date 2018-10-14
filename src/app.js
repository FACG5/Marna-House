const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const controller = require('./controllers');
const cookieParser = require('cookie-parser');
const {unlockCookie} = require('./middlewares/unlockCookie');

const app = express();

// Middlewares
app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cookieParser());
app.use(unlockCookie);
app.use(controller);

// HandleBars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
  extname: 'hbs',
  partialsDir: path.join(__dirname, 'views', 'partials'),
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  defaultLayout: 'main',
}));


module.exports = app;
