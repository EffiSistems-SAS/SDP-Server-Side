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

    async obtenerEmpleados(){
        const lista = await Empleado.find();
        return lista;
    }

    async eliminarEmpleado(correo){
        await Empleado.deleteOne({ correo: correo });
        return `Usuario ${id} ha sido eliminado`;
    }

    async obtenerAdministrador(data){
        const admin = await Administrador.findOne(data);
        return admin;
    }
    
    async editarEmpleado(body) {
        let user = await Empleado.findOne({ correo: body.correo });
        for (let clave in user) {
            if (body.hasOwnProperty(clave)) {
               user[clave] = body[clave];
            }
        }
        user.save();
        return user;
    }


}

module.exports = MongoController;