const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const { Router } = require("express");
const { upload } = require("../functions/storageMongo");
const { verifArchivoExistente } = require("../functions/verifArchivo");
const path = require("path");
const router = Router();
const MongoUri = require("../private/credentialsDB");
const conn = mongoose.createConnection(MongoUri);
const MongoController = require("../controllers/MongoController");

let gfs;

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

router.post("/post/:id", verifArchivoExistente, upload.single("file"), async (req, res) => {
      let RegistroRes = await mongoController.insertarRegistro({
        idEmpleado: req.params["id"],
        idFile: req.file.id,
      });
      console.log("Llegó a insertar registro");
      let HistorialRes = await mongoController.insertarHistorialCambios({
        idFile: req.file.id,
        cambios: { version: 1.0, fecha: new Date().toString() },
      });
      console.log("Llegó a insertar historial");
      if (RegistroRes === null || HistorialRes === null) {
        res.status(400).send("Hubo un error");
      } else {
        res.status(200).send("File uploaded");
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

router.delete("/delete/:idEmp/:idFile", async (req, res) => {
  let mongoController = new MongoController();
  console.log(req.params["idFile"]);
  let statusArchivo = await mongoController.eliminarArchivo(
    req.params["idFile"]
  );
  let statusRegistro = await mongoController.eliminarRegistro(
    req.params["idEmp"],
    req.params["idFile"]
  );
  res
    .status(statusArchivo === 200 && statusRegistro === 200 ? 200 : 400)
    .send();
});

module.exports = router;
