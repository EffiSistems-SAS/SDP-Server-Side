const { Router } = require('express');
const MongoController = require('../controllers/MongoController');
const { deleteFilesMiddleWare } = require('../functions/adminMiddleWares');

const routerAdmin = Router();
let controller = new MongoController();

routerAdmin.post('/create',async (req,res) => {
    req.body.id = `IDEMPLEADO_${Date.now()}`
    let empleado = await controller.crearEmpleado(req.body);
    if(empleado){
        res.status(200).send(`Empleado con código ${req.body.id} creado`);
    }else{
        res.status(400).send(`Ocurrio un error`);
    }
});

routerAdmin.delete('/delete/:correo/',deleteFilesMiddleWare,async (req,res) => {
    let respuesta = await controller.eliminarEmpleado(req.params['correo']);
    res.status(202).send(respuesta);
});

routerAdmin.put('/edit/',async (req,res) => {
    let empleado = await controller.editarEmpleado(req.body);
    if(empleado){
        res.status(200).send(`Empleado ${empleado.nombre} editado`);
    }else{
        res.status(400).send(`Ocurrio un error`);
    }
    
});

routerAdmin.get('/get/:correo',async (req,res) => {
    let empleado = await controller.obtenerEmpleado({correo:req.params['correo']});
    if(empleado){
        res.status(200).json(empleado);
    }else{
        res.status(404).send('Empleado no encontrado');
    }
    
});

routerAdmin.get('/list',async (req,res) => {
    let lista = await controller.obtenerEmpleados();
    res.json(lista);
});



module.exports = routerAdmin;