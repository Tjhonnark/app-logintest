const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

//  Esquema de los datos
const userSchema = new Schema({
    email: String,
    password: String
});

//  Función recibe password para que el modulo bcrypt-nodejs lo cifre
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//"hashSync" recibe el texto que queremos(el password en este caso).
};

//  Función para comparar password de la base de datos
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

//  Utilizar esquema en la colleción "users"
module.exports = mongoose.model('users', userSchema);