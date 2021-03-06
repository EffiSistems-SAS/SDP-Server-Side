const MongoController = require('../controllers/MongoController');
let controller = new MongoController();
const { formatString } = require('./proccesData');

const verifExistencia = async (req,res,next) => {

    let text = formatString(req.params['fileName']);
    let registros = await controller.obtenerRegistros(req.params["idEmpleado"]);
    if (registros.length === 0 || registros === null) {
        next();
      } else {
        let estado = true;
        let registroEditar;

        for(let e of registros){
            if(e.idFile.filename === text){
                registroEditar = e.idFile._id;
                estado = false;
                break;
            }
        }
        if(estado){
            next();
        }else{
            let respuestEditar = controller.editarHistorial(registroEditar);
            if(respuestEditar){
                res.status(202).send('Historial actualizado');
            }else{
                res.status(400).send('Hubo un error al actualizar el historial');
            }
        }
      }
}

module.exports = {
    verifExistencia,
}