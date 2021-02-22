const Empleado = require('../models/Empleado');
const Administrador = require('../models/Administrador');
const Registro = require('../models/Registro');
const archivos_files = require('../models/archivos.files');
const Historial = require('../models/HistorialCambios');
class MongoController {

    createAdministrador(admin){
        const administrador = new Administrador(admin);
        return administrador.save().then((data) => {
            return data;
        }).catch(() => {
            return null;
        });
    }

    async obtenerAdministrador(data){
        const admin = await Administrador.findOne(data);
        return admin;
    }

    crearEmpleado(user){
        const empleado = new Empleado(user);
        return empleado.save().then((data) => {
            return data;
        }).catch((err) => {
            return null;
        });
    }

    async obtenerEmpleados(){
        const lista = await Empleado.find();
        return lista;
    }

    async obtenerEmpleado(body){
        const empleado = await Empleado.findOne(body);
        return empleado;
    }

    async eliminarEmpleado(correo){
        await Empleado.deleteOne({ correo: correo });
        return `Usuario eliminado`;
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

    eliminarArchivo(idFile){
        return archivos_files.deleteOne({ _id:idFile }).then((result) => {
            return 200;
        }).catch((err) => {
            return 400;
        });
    }

    async obtenerArchivos(idEmp){
        let registro = await Registro.find({idEmpleado:idEmp}).populate('idFile').exec();
        return registro;
    }

    insertarRegistro(registro){
        const newRegister = new Registro(registro);
        return newRegister.save().then((data) => {
            return data;
        }).catch((err) => {
            return null;
        });
    }

    eliminarRegistro(idEmpleado,idFile){
        return Registro.deleteOne({ idFile:idFile, idEmpleado:idEmpleado }).then((result) => {
            return 200;
        }).catch((err) => {
            return 400;
        });
    }

    async obtenerRegistros(idEmpleado){
        return await Registro.find({ idEmpleado:idEmpleado });
    }

    insertarHistorialCambios(idFile,Cambios){
        const newHistory = new Historial({idFile:idFile, cambios:Cambios});
        return newHistory.save().then((data) => {
            return data;
        }).catch((err) => {
            return null;
        }); 
    }

}

module.exports = MongoController;