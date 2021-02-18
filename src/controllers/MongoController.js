const Empleado = require('../models/Empleado');
const Administrador = require('../models/Administrador');

class MongoController {

    crearEmpleado(user){
        const empleado = new Empleado(user);
        empleado.save();
    }

    createAdministrador(admin){
        //await mongoose.createConnection(MongoURI);
        const administrador = new Administrador(admin);
        administrador.save();
    }

    async obtenerEmpleado(correo,contraseña){
        const empleado = await Empleado.findOne({ correo: correo,contraseña:contraseña });
        return empleado;
       
    }

    async obtenerAdministrador(data){
        const admin = await Administrador.findOne(data);
        return admin;
    }


}

module.exports = MongoController;