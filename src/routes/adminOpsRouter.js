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

routerAdmin.put('/edit/:correo?',(req,res) => {
    let user = controller.editarEmpleado(req.body,req.query.correo);
    res.send(`Empleado ${user.nombre} editado`);
});

routerAdmin.get('/list',async (req,res) => {
    let lista = await controller.obtenerEmpleados();
    res.json({
        data:lista
    });
});

module.exports = routerAdmin;