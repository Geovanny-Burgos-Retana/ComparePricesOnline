var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://gio:123@ds157475.mlab.com:57475/compare-prices-online', ['listas', 'productos']);

//get todas las listas
router.get('/listas', function(req, res, next){
    db.listas.find(function(err, listas){
    	if(err){
    		res.send(err);
    	}
    	res.json(listas);
    });
});

//Guardar lista
router.post('/lista', function(req, res, next){
    var lista = req.body;
    if(!lista.nombre ){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.listas.save(lista, function(err, lista){
            if(err){
                res.send(err);
            }
            res.json(lista);
        });
    }
});

// borrar lista
router.delete('/lista/:id', function(req, res, next){
    db.listas.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, lista){
        if(err){
            res.send(err);
        }
        res.json(lista);
    });
});

//productos por id
router.get('/listas/:id', function(req, res, next){
    db.productos.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, producto){
        if(err){
            res.send(err);
        }
        res.json(producto);
    });
});

//productos de un supermercado
router.get('/listaP/:supermercado', function(req, res, next){
    db.productos.find({supermercado: req.params.supermercado}, function(err, productos){
        if(err){
            res.send(err);
        }
        res.json(productos);
    });
});

// Get una sola lista 
router.get('/lista/:id', function(req, res, next){
    console.log('antes');
    db.listas.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            console.log('error');
            res.send(err);
        }
        res.json(task);
    });
});

// Insertar un producto en lista de compras
router.put('/listas/:id', function(req, res, next){
    var lista = req.body;
    var updLista = {};
    
    if(lista.supermercado){
        updLista.supermercado = lista.supermercado;
    }

    if(lista.productos){
        updLista.productos = lista.productos;
    }
    
    if(lista.nombre){
        updLista.nombre = lista.nombre;
    }
    
    if(!updLista){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        
        db.listas.update({_id: mongojs.ObjectId(lista._id)}, {$push: {productos: lista.producto}}, {}, function(err, lista){
        if(err){
            
            res.send(err);
        }
        console.log('aqui');
        res.json(lista);
    });
    }
});

module.exports = router;