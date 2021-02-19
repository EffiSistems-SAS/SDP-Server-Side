const Empleado = require('../models/Empleado');
const Administrador = require('../models/Administrador');

class MongoController {

    crearEmpleado(user){
        const empleado = new Empleado(user);
        return empleado.save().then((data) => {
            return data;
        }).catch((err) => {
            console.log(err);
            return null;
        });
    }

    createAdministrador(admin){
        //await mongoose.createConnection(MongoURI);
        const administrador = new Administrador(admin);
        return administrador.save().then((data) => {
            return data
        }).catch(() => {
            return null;
        });
    }

    async obtenerEmpleado(body){
        const empleado = await Empleado.findOne(body);
        return empleado;
    }

    async obtenerEmpleados(){
        const lista = await Empleado.find();
        return lista;
    }

    async eliminarEmpleado(correo){
        await Empleado.deleteOne({ correo: correo });
        return `Usuario eliminado`;
    }

    async obtenerAdministrador(data){
        const admin = await Administrador.findOne(data);
        return admin;
    }
    
    async editarEmpleado(body) {
        let user = await Empleado.findOne({ correo: body.correo });
        if(user === null || user === undefined){
            return null;
        }
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