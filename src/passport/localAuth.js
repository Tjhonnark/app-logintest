const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//  Esquema de la base de datos
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id); //Cada vez que viaje por diferentes páginas
});                      //Le va a dar el id

passport.deserializeUser(async (id, done) => {
    //Cada viaje por ventana consultara a la base de datos
    const user = await User.findById(id);   
    //Devolvera los datos del user y se lo dará al navegador
    done(null, user);   
});

passport.use('local-signup', new LocalStrategy({   //Usuario se signup, se utiliza este módulo
    usernameField:'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {  //Recibe sus datos

    //Validación de usuario
    const user = await User.findOne({email: email});
    if (user) {
        return done(null, false, req.flash('signupMessage', 'Email has already been registered.'));
    } else {
        const newUser = new User();    //Crear nuevo usuario
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();  //Guardar usuario
        done(null, newUser);   //Terminar proceso devolviendo un null y el usuario que ha registrado
    }


}));   

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',            
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {

    const user = await User.findOne({email: email});
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'No User found.'));
    } if (!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Incorrect password.'));
    }
    done(null, user);
}));