const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const passport = require("passport");
const flash = require('connect-flash');
const { default: mongoose } = require('mongoose');

//  Initializations
const app = express();
require('./database');
require('./passport/localAuth');

//  settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

//  middlewares
app.use(morgan('dev')); 
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());    //Almacena datos en una sección

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.user = req.user;
    next();
})

//  Routes
app.use('/', require('./routes/mainRoutes'));

//  starting the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
