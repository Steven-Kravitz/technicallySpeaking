const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

// Sequelize
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require('./config/connection');


const routes = require('./controllers');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

//Set up sessions
const sess = {
    secret: 'GooseTarnished',
    cookie: {maxAge: 1000*60*15},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

app.use(session(sess));

// Handlebars
const hbs = exphbs.create({ helpers });
app.set('view engine', 'handlebars');
app.engine('handlebars', hbs.engine);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now live on localhost:${PORT}`));
  });