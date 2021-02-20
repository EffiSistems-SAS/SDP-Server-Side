
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const { Router } = require("express");
const { upload } = require("../functions/storageMongo");
const path = require('path');
const router = Router();
const MongoUri = require('../private/credentialsDB');
const conn = mongoose.createConnection(MongoUri);
const MongoController = require('../controllers/MongoController');

let gfs;

conn.once('open',() => {
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

  let relativePath = path.resolve('uploads',req.params['empName'],req.params['fileName']);
  console.log(req.params['empName']);
  console.log(req.params['fileName']);
  console.log(relativePath);
  gfs.files.findOne({ filename: req.query.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    res.status(200).download(relativePath,`New ${req.query.filename}`, function (err) {
      if (err) {
        console.log(err);
      }
    });
  });
});

router.post("/post/:id", upload.single("file"), async (req, res) => {
  if (req.file === undefined) {
    console.log("asd");
    res.send("Ha ocurrido un error");
  } else {  
    let mongoController = new MongoController();
    await mongoController.insertarRegistro({idEmpleado:req.params['id'],idFile:req.file.id});
    res.send("File uploaded");
  }
});

// router.get(){

// }

module.exports = router;
