const mongoose = require('mongoose');
const { Schema } = mongoose;
const archivos_files = require('./archivos.files');

const registroSchema = new Schema({
    idEmpleado:{ type:String, required:true},
    idFile:{ type:mongoose.Types.ObjectId, required:true, ref:archivos_files, unique:true},
});

const model = mongoose.model('Registro',registroSchema);

module.exports = model;