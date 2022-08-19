require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');

const mongoURI = process.env.DB ? process.env.DB : ''

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error('Error connecting to mongo', err));

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTENDPOINT, process.env.FRONTENDPOINT2]
  })
);

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET,
    cookie: { maxAge: 1000 * 60 * 60 }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));

const index = require('./routes/index');
const auth = require('./routes/authRoutes');
const users = require('./routes/usersRoutes');
const offices = require('./routes/officesRoutes');
const boardrooms = require('./routes/boardroomsRoutes');
const clients = require('./routes/clientsRoutes');
const coworks = require('./routes/coworksRoutes')
const officesRegister = require('./routes/officesRegistersRoutes')
const boardRoomsRegister = require('./routes/boardroomRegistersRoutes')

app.use('/', index);
app.use('/auth', auth);
app.use('/users', users);
app.use('/offices', offices);
app.use('/offices-register', officesRegister)
app.use('/boardrooms', boardrooms);
app.use('/boardrooms-register', boardRoomsRegister);
app.use('/client', clients);
app.use('/cowork', coworks)


// Uncomment this line for productio
// app.get('/*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

module.exports = app;
