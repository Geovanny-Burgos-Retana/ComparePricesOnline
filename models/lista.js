const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const ListaSchema = mongoose.Schema({
	nombre: {
		type: String
	},
	supermercado: {
		type: String
	},
	productos:{
		type: String
	}
});

const Lista = module.exports = mongoose.model('Lista', ListaSchema);


module.exports.getProductos = function(supermercado, callback){
	const query = {supermercado: supermercado}
	Lista.findOne(query, callback);
}

module.exports.addLista = function(newList, callback){
	newList.save(callback);
}



