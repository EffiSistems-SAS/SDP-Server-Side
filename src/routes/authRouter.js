const { Router } = require('express');
const MongoController = require('../controllers/MongoController');

const routerAuth = Router();

let controller = new MongoController();

routerAuth.get('/login/:mail/:password', async (req,res) => {
    const empleado = await controller.obtenerEmpleado({correo:req.params['mail'],contrasena:req.params['password']});
    if(empleado){
        const administrador = await controller.obtenerAdministrador({idEmpleado:empleado.id});
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
    req.body.id = `IDEMPLEADO_${Date.now()}`
    await controller.crearEmpleado(req.body);
    await controller.createAdministrador({idAdministrador:`IDADMIN_${Date.now()}`,idEmpleado:req.body.id});
    res.send(`Administrador con código ${req.body.id} creado`);
});

module.exports = routerAuth;