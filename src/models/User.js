const { Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');  //este modulo se encarga de cifrar o encriptar el string password

const userSchema = new Schema({
    username: String,
    email: String,
    password :String
});

userSchema.methods.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);  //gsalt es un algorito que se aplica para hacer el password mas seguro,esta vez lo aplicaremos 10 veces
    return bcrypt.hash(password,salt);   //es otro metodo q utilizaremos , es el encargado de convertir un string en un conjunto de carazteres indescifrables

};

userSchema.method.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
}


//ahora lo creo para la base de datos: y lo exporto porque asi lo podre utilizar en otras partes de mi aplicacion

module.exports = model('User', userSchema);

