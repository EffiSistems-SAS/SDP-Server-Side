const mongoose = require('mongoose');
const { Schema } = mongoose;

const empleadoSchema = new Schema({
    nombre:{ type:String, required:true},
    contraseña:{ type:String, required:true},
    id:{type:String,required:true},
    correo:{type:String,required:true,unique:true},
    rol:{type:String,required:true},
    cargo:{type:String,required:true}
});

const model = mongoose.model('Empleado',empleadoSchema);

module.exports = model;