//aqui estara la configuracion de la aplicacion
const express = require ('express');
const app = express();

app.use(express.json());  //con esta linea de codigo ahora nuestro servidor es capaz de entender todos los achivos json, es decir, cuando yo le envie un json al servidor el el capaz de convertirloa un objeto de javascript
app.use(express.urlencoded({extended: false})); //con este codigo ahora tambien su servidor es capaz de entender los datos q se le envien al traves de un formulario y convertirlo en un objeto de javascript

app.use(require('./src/controllers/authController'))

module.exports= app