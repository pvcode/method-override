const express = require("express");
const methodOverride = require('method-override')
const ejs = require("ejs");
const expressLayouts = require('express-ejs-layouts');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const session = require('express-session');
const messages = require('express-messages');

const configsSystem = require('./configs/system')
const databaseConfigs = require("./configs/database");

// Connect DB - mongoose
mongoose
  .connect(databaseConfigs.database)
  .then(() => console.log("Mongoose Connected!"))
  .catch(err => console.log(err));


// Init app
const app = express();

// Method Override Middleware
app.use(methodOverride('_method'));

// View engine setup
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("views", "./views");
app.set("layout", "admin");

// Set public folder
app.use(express.static('./public'));

app.get("/", (req, res) => {
  res.send("abc");
});

// Global variable
app.locals.errors = null;
app.locals.configsSystem = configsSystem; 

// Validator
app.use(expressValidator({
  customValidators: {
      isNotEqual: (value1, value2) => {
          return value1 !== value2
      }
  }
}));

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'whatyoudo',
    resave: true,
    saveUninitialized: true
}));

// flash message
app.use(flash());

// Set router
app.use(`/${configsSystem.PREFIX_ADMIN}/category`, require('./routes/admin/category'));
app.use(`/${configsSystem.PREFIX_ADMIN}/group`, require('./routes/admin/group'));
app.use(`/${configsSystem.PREFIX_ADMIN}`, require('./routes/admin/dashboard'));


const port = process.env.PORT || 3069;
app.listen(port);
console.log(`Server started on port ${port}`);
