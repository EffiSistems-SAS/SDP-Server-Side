const { Router } = require('express');
const MongoController = require('../controllers/MongoController');

const registroRouter = Router();
let controller = new MongoController();

registroRouter.get('/:idEmpleado/:fileName',async (req,res) => {
    let registros = await controller.obtenerRegistros(req.params["idEmpleado"]);
    if (registros.length === 0 || registros === null) {
        res.status(200).send('No existe el registro');
      } else {
        let estado = true;
        for(let e of registros){
            if(e.idFile.filename === req.params["fileName"]){
                res.status(201).send('Actualizar Historial');
                estado = false;
                break;
            }
        }
        if(estado)
            res.status(200).send('No encontro el registro');
      }
});


module.exports = registroRouter;

