const jwt = require ('jsonwebtoken');
const config =require ('../../config')
//En este archivo lo que voy a crear es un middlware (una peticion, o un manejador de peticiones), una funcion intermedia que se pasa antes de otras peticiones para

function verifyToken (req,res,next) {
    const token = req.headers['x-access-token'];
    if (!token){    //si no existe un token entonces retorno
        return res.status(401).json({
            auth: false,
            message: 'No token provided',
        });
    }
    // si por el contrario si me da el token , entonces utilizare el metodo llamado verify, que sirve para verificar el token
    const decoded = jwt.verify(token, config.secret);   //para poder decodificar el token , volvemos a necesitar el secret
    req.userId = decoded.id;
    next();
} 
module.exports = verifyToken;