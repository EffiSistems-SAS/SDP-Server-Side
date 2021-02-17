const { Router } = require('express');
const MongoController = require('../controllers/MongoController');

const routerAuth = Router();

let controller = new MongoController();

routerAuth.get('/login/:mail/:password', async (req,res) => {
    const empleado = await controller.obtenerEmpleado(req.params['mail'],req.params['password']);
    if(empleado){
        const administrador = await controller.obtenerAdministrador(req.params['mail'],req.params['password']);
        if(administrador){
            res.status(202).send('Administrador encontrado.');
        }else{
            res.status(200).send('Empleado encontrado.');
        }
    }else{
        res.status(404).send('Correo o contraseña incorrecta.');
    }
});

routerAuth.post('/administrador',async (req,res) => {
    await controller.crearEmpleado(req.body);
    await controller.createAdministrador({idAdministrador:`IDADMIN${Date.now()}`,idEmpleado:req.body.id});
    res.send(`Administrador con código ${req.body.id} creado`);
});

routerAuth.post('/empleado',async (req,res) => {
    await controller.crearEmpleado(req.body);
    res.send(`Empleado con código ${req.body.id} creado`);
});

module.exports = routerAuth;