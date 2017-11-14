const express = require('express');
const router = express.Router();
const Lista = require('../models/lista');

//Registrar
router.post('/agregar', (req, res, next) =>{
	let newList = new Lista({
		nombre: req.body.nombre,
		supermercado: req.body.supermercado,
		productos: req.body.productos
	});
	

	Lista.addLista(newList, (err, user) =>{
		if(err){
			res.json({success: false, msg:'Error al crear Lista'});
		} else{
			res.json({success: true, msg:'Lista creada'});
		}
	});
});

//Cargar productos
router.get('/productos', (req, res, next) =>{
	const supermercado = req.body.supermercado;

	Lista.getProductos(supermercado, (err, lista) =>{
		if(err){
			res.json({success: false, msg:'Error xxx'});
		} else{
			res.json();
		}
	});
});

//modificar
router.get('/modificar', (req, res, next) =>{
	res.send('MODIFICAR');
});

module.exports = router;