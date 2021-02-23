//Modelos

const Empleado = require('../models/Empleado');
const Administrador = require('../models/Administrador');
const Registro = require('../models/Registro');
const archivos_files = require('../models/archivos.files');
const Historial = require('../models/HistorialCambios');

class MongoController {

    //Administrador

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

    //Empleado

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

    //Archivos

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

    async obtenerArchivo(fileName){
        return await archivos_files.findOne({filename:fileName});
    }

    //Registros

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
        return await Registro.find({ idEmpleado:idEmpleado }).populate('idFile').exec();
    }

    //Historial de cambios

    insertarHistorialCambios(idFile,Cambios){
        const newHistory = new Historial({idFile:idFile, cambios:Cambios});
        return newHistory.save().then((data) => {
            return data;
        }).catch((err) => {
            console.log(err);
            return null;
        }); 
    }

    obtenerHistorialCambios(id){
        return Historial.findOne({idFile:id}).then((data) => {
            return data;
        }).catch(() => {
            return null;
        });
    }

    async editarHistorial(id) {
        let historial = await Historial.findOne({ idFile: id });
        if(historial === null || historial === undefined){
            return null;
        }
        historial.cambios.push({version:historial.cambios.length+1,fecha:new Date().toString()});
        historial.save();
        return historial;
    }

    eliminarHistorialArchivo(idFile){
        return Historial.deleteOne({ idFile:idFile}).then(() => {
            return 200;
        }).catch(() => {
            return 400;
        });
    }

}

module.exports = MongoController;