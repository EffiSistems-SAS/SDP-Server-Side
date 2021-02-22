const { Router } = require('express');
const routerMulter = Router();
const reciveFiles = require('../functions/receiveFiles');
const multer = require('multer');
const moveFile = require('move-file');

routerMulter.use(reciveFiles());

routerMulter.post('/:name',(req,res) => {
  
    multer.diskStorage({
        destination: `uploads/${req.params['name']}`
    });

    moveFile(`uploads/${req.file.originalname}`, `uploads/${req.params['name']}/${req.file.originalname}`).then((result) => {
        res.status(200).send('Archivo guardado');
    }).catch((err) => {
        res.status(400);
    });
});


module.exports = routerMulter;