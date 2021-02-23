const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const path = require("path");
const MongoUri = require("../private/credentialsDB");
const conn = mongoose.createConnection(MongoUri);
const MongoController = require("../controllers/MongoController");

const { Router } = require("express");
const { upload } = require("../functions/storageMongo");
const { verifExistencia } = require('../functions/registroMiddleWares');

const router = Router();
let gfs;
let mongoController = new MongoController();

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("archivos");
});

router.get("/", async (req, res) => {
  if (gfs === undefined) {
    res.send("undefined");
  } else {
    gfs.files.find().toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "No files exist",
        });
      }
      return res.json({
        files,
      });
    });
  }
});

router.get("/get/:idEmp", async (req, res) => {
  let mongoController = new MongoController();
  let archivos = await mongoController.obtenerArchivos(req.params["idEmp"]);
  if (archivos === null) {
    res.json({ status: "Usuario sin archivos subidos" });
  } else {
    res.json(archivos);
  }
});

router.get("/get/:empName/:fileName", (req, res) => {
  let relativePath = path.resolve(
    "uploads",
    req.params["empName"],
    req.params["fileName"]
  );
  gfs.files.findOne({ filename: req.query.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    res
      .status(200)
      .download(relativePath, `New ${req.query.filename}`, function (err) {
        if (err) {
          console.log(err);
        }
      });
  });
});

router.post("/post/:idEmpleado/:fileName",verifExistencia,upload.single("file"), async (req, res) => {
  let RegistroRes = await mongoController.insertarRegistro({
    idEmpleado: req.params["idEmpleado"],
    idFile: req.file.id,
  });
  let HistorialRes = await mongoController.insertarHistorialCambios(req.file.id,{ version: 1.0, fecha: new Date().toString() });
  if (RegistroRes === null || HistorialRes === null) {
    res.status(400).send("Hubo un error al crear el registro o el historial");
  } else {
    res.status(200).send("File uploaded");
  }
});



router.delete("/delete/:idEmp/:idFile", async (req, res) => {
  let mongoController = new MongoController();
  let statusArchivo = await mongoController.eliminarArchivo(
    req.params["idFile"]
  );
  let statusRegistro = await mongoController.eliminarRegistro(
    req.params["idEmp"],
    req.params["idFile"]
  );
  res.status(statusArchivo === 200 && statusRegistro === 200 ? 200 : 400).send('');
});

module.exports = router;
