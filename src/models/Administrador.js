const mongoose = require('mongoose');
const { Schema } = mongoose;

const administradorSchema = new Schema({
    idEmpleado:{type:String,required:true,ref:'Empleado'},
    idAdministrador:{type:String,required:true}
});

const model = mongoose.model('Administrador',administradorSchema);

module.exports = model;