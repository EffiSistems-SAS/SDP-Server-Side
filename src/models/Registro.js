const mongoose = require('mongoose');
const { Schema } = mongoose;

const registroSchema = new Schema({
    idEmpleado:{ type:String, required:true, ref:'Empleado'},
    idFile:{ type:mongoose.Types.ObjectId, required:true, ref:'archivos.files', unique:true},
    // ruta:{ type:String, required:true},
});

const model = mongoose.model('Registro',registroSchema);

module.exports = model;