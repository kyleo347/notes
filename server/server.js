/* eslint-disable no-console */
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');

const auth = require('./auth.json');
const router = require('./routes');
const schemas = require('./schemas');

const API_PORT = 3001;
const app = express();

// this is our MongoDB database
const dbRoute = `mongodb://${auth.user}:${auth.password}@ds141704.mlab.com:41704/notes`;

// connects our back end code with the database
mongoose.connect(
  dbRoute, {
    useNewUrlParser: true,
  },
);

const db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());
app.use(cookieParser());

app.use(passport.initialize());

// passport config

const { User } = schemas;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: auth.secret,
}, ((jwtPayload, cb) => {
  // find the user in db if needed. This functionality may be omitted
  // if you store everything you'll need in JWT payload.
  User.findById(jwtPayload.id)
    .then(user => cb(null, user))
    .catch(err => cb(err));
})));

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => (console.log(`LISTENING ON PORT ${API_PORT}`)));
