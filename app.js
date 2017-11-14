//Dependencias
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')

//Conexion con mongoDB
mongoose.connect(config.database);

//On connection
mongoose.connection.on('connected', () => {
	console.log('Conectado a la base de datos '+ config.database)
});

//Para errores
mongoose.connection.on('error', (err) => {
	console.log('Error en base de datos '+ err)
});

//Variable de inicializacion
const app = express();

const listas = require('./routes/listas')

//Numero de puerto
const port = 3000;

//Cors Middleware
app.use(cors());

//Set static folder para el cliente
app.use(express.static(path.join(__dirname, 'public')));

//Body parser Middleware
app.use(bodyParser.json());


app.use('/listas', listas);


//Index Route
app.get('/', (req, res) => {
	res.send('Algooooo.');
});


// inicilizar servidor
app.listen(port, () => {
	console.log('Servidor iniciado en puerto ' + port);
});
