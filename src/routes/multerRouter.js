const { Router } = require('express');
const routerMulter = Router();
const reciveFiles = require('../functions/reciveFiles');
const multer = require('multer');
const moveFile = require('move-file');

routerMulter.use(reciveFiles());

routerMulter.post('/',async (req,res) => {
  
    multer.diskStorage({
        destination: `uploads/${req.query.name}`
    });

    await moveFile(`uploads/data/${req.file.originalname}`, `uploads/data/${req.query.name}/${req.file.originalname}`);
    res.send('Archivo guardado');
});


module.exports = routerMulter;