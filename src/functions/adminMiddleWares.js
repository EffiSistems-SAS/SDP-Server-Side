const MongoController = require('../controllers/MongoController');
let controller = new MongoController();

const deleteFilesMiddleWare = async (req,res,next) => {

    let empleado = await controller.obtenerEmpleado({correo:req.params['correo']});

    let registros = await controller.obtenerRegistros(empleado.id);
    let ids = [];
    for(let e of registros){
        ids.push(e.idFile._id);
    }
    await controller.eliminarRegistros(empleado.id);
    for(let i = 0; i < ids.length; i++){
        await controller.eliminarHistorialArchivo(ids[i]);
        await controller.eliminarArchivo(ids[i]);
    }

    next();
}

module.exports = {
    deleteFilesMiddleWare
}