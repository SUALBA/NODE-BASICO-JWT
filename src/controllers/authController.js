//aqui voy a definir las rutas, pero primero creo un enrutador
const { Router} = require ('express');
const router = Router();
//jwebtoken me permite crear un token y tambien validarlo. 
const jwt = require('jsonwebtoken');
const config = require('../../config');
const verifyToken = require ('../controllers/verifyToken');

const User = require('../models/User');

//aqui es para que el usuario se registre como nuevo cliente REGISTRO/SIGNUP
router.post('/signup', async(req,res, next)=> {
    const {username, email, password}= req.body;
   //User.create ({ username: username, email : email, password :password })es un metodo del modelo que sirve para guardar un dato directamente en la base de datos
  //otra forma es crear el modelo y no guardarlo.  Ahora lo creamos con una constante user y lo guardamos por consola
    const user = new User ({
        username: username,
        email : email,
        password :password
    });
    user.password = await user.encryptPassword(user.password);
    await user.save();
    const token = jwt.sign({id: user._id},config.secret,{
        expiresIn: 60 * 60 * 24
    })

    res.json({auth: true, token })
})

//las rutas anteriores son POST porque enviamos datos del cliente al servidor, y esta es GET porque esta al final me devuelve algo.
//escribiendo verifyToken en cualquier ruta la protego para que solo puedan entrar los que tienen token
router.get('/me',verifyToken, async(req,res,next)=>{
      
const user = await User.findById(req.userId, {password: 0});   //el password 0 es porque es un dato que no queremos que nos devuelva 
    if (!user) {
        return res.status(404).send('No user found');
    }
    res.json(user);
})

//AQUI PARA QUE EL CLIENTE ENTRE EN LA APLICACION, PERO YA ESTA REGISTRADO DE ANTES LOGIN/SIGNIN

router.post('/signin', async (req,res,next) => {
   const { email, password} = req.body;
   const user = await User.findOne({email:email});
   if (!user) {     //y si no existe el usuario...
        return res.status(404).send("the email doesn't exists!");
   }
const validPassword = await user.validatePassword(password);
if (!validPassword){
    return res.status(401).json({auth: false, token: null});
}

const token = jwt.sign({id: user._id}, config.secret,{
    expiresIn: 60 * 60 * 24
});
       
   //si el usuario existe, lo siguiente es comprobar que la contraseña es correcta
   
    res.json({auth: true, token}); 
})


module.exports = router;