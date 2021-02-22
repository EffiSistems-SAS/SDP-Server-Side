const { json } = require("body-parser");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const archivos_files = require("./archivos.files");

const HistorialCambios = new Schema({
  idFile: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true,
    ref: archivos_files,
  },
  cambios: {
    type: [
      {
        version: { type: Number, required: true, unique: true },
        fecha: { type: Date, required: true, unique: true },
      },
    ],
    required: true,
  },
});

const model = mongoose.model("HistorialCambios", HistorialCambios);

module.exports = model;
