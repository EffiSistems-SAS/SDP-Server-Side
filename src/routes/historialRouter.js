const { Router } = require('express');
const MongoController = require('../controllers/MongoController');

let controller = new MongoController();
const historialRouter = Router();

historialRouter.get('/:idFile',async (req,res) =>{
    let historial = await controller.obtenerHistorialCambios(req.params['idFile']);
    if(historial){
        res.status(200).json(historial);
    }else{
        res.status(400).json(null);
    }
});

module.exports = historialRouter;