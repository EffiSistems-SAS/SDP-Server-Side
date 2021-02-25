const MongoController = require('../controllers/MongoController');
const fs = require('fs');
const path = require('path');
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

    let pathFileRemove = empleado.nombre.replaceAll(' ','+');
    fs.rmdir(path.resolve('uploads',pathFileRemove), { recursive: true },(err) => {
        if(err)
            console.log(err);
        else
            next();    
    });
}

module.exports = {
    deleteFilesMiddleWare
}