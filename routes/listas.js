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

module.exports = router;