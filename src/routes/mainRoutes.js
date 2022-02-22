const express = require('express');
const res = require('express/lib/response');
const { authenticate } = require('passport');
const router = express.Router();

const passport = require('passport');

router.get('/', (req, res, next) => {
    res.render('index');
});
//Register
//Enviar una ventana(donde se ingresaran los datos)
router.get('/signup', (req, res, next) => {
    res.render('signup');
});
//Escuchar los datos del usuario y validar
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    passReqToCallback: true
}));
//Login
//Enviar una ventana(donde se ingresaran los datos)
router.get('/signin', (req, res, next) => {
    res.render('signin');
});
//Escuchar los datos del usuario y validar
router.post('/signin',  passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: 'signin',
    passReqToCallback: true
}));

//  Logout o Deslogueo
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

//Validación de sesión para las siguientes rutas
//El método "use" se ejecuta antes de seguir
router.use((req, res, next) => {
    isAuthenticated(req, res, next);
    next();
});

//  Rutas con sesión iniciada
router.get('/profile', (req, res, next) => {
    res.render('profile');
});
//  Función para autenticar sesión
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();      
    }
    res.redirect('/');
};

module.exports = router;