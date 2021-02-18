const { Router } = require('express');
const MongoController = require('../controllers/MongoController');
const router = require('./fileRouter');

const routerAdmin = Router();
let controller = new MongoController();

routerAdmin.post('/create',async (req,res) => {
    req.body.id = `IDEMPLEADO_${Date.now()}`
    await controller.crearEmpleado(req.body);
    res.send(`Empleado con código ${req.body.id} creado`);
});

routerAdmin.delete('/delete/:correo?',async (req,res) => {
    let respuesta = await controller.eliminarEmpleado(req.query.correo);
    res.send(respuesta);
});

routerAdmin.put('/edit/',(req,res) => {
    let user = controller.editarEmpleado(req.body);
    res.send(`Empleado ${user.nombre} editado`);
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