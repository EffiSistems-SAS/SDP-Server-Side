const mongoose = require('mongoose');
const { Schema } = mongoose;

const archivosFilesSchema = new Schema({
    length:{ type:Number, required:true }, 
    chunkSize:{ type:Number,required:true},
    uploadDate:{ type:Date, required:true, default:Date.now()},
    filename:{ type:String, required:true},
    md5:{ type:String, required:true},
    contentType:{ type:String, required:true}
});

const model = mongoose.model('archivos.files',archivosFilesSchema);

module.exports = model;