
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const { Router } = require("express");
const { upload } = require("../functions/storageMongo");
const path = require('path');
const router = Router();
const MongoUri = require('../private/credentialsDB');
const reciveFiles = require("../functions/reciveFiles");
const conn = mongoose.createConnection(MongoUri);

let gfs;

conn.once('open',() => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("archivos");
});


//router.use(reciveFiles());

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

router.get("/get/:filename?", (req, res) => {

  let as = path.resolve('uploads',`${req.query.filename}`);
    console.log("- - - - - - - - - path - - - - - - - - -");
    console.log(as);
    console.log("- - - - - - - - - path - - - - - - - - -");
  let relativePath = path.relative(__dirname,'uploads',req.query.filename);

  gfs.files.findOne({ filename: req.query.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    // res.json({file});
    
    res.status(200).download(relativePath,`New ${req.query.filename}`, function (err) {
      if (err) {
        console.log(err);
      }
      console.log("Downloaded");
    });
  });
});

router.post("/post", upload.single("file"), async (req, res) => {
  
  if (req.file === undefined) {
    res.send("Ha ocurrido un error");
  } else {  
    res.send("File uploaded");
  }
});

module.exports = router;
