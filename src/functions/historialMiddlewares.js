const MongoController = require('../controllers/MongoController');
let controller = new MongoController();

const searchIdFile = async (req,res,next) => {
    let archivo = await controller.obtenerArchivo(req.params['fileName']);
    if(archivo === null){
        res.status(400).send('Archivo no encontrado');
    }else{
        console.log(archivo);
        req.body.id = archivo.id;
        next();
    }
}

module.exports = {
    searchIdFile
}