const { Router } = require('express');
const routerMulter = Router();
const reciveFiles = require('../functions/reciveFiles');
const multer = require('multer');
const moveFile = require('move-file');

routerMulter.use(reciveFiles());

routerMulter.post('/:name',async (req,res) => {
  
    multer.diskStorage({
        destination: `uploads/${req.params['name']}`
    });

    await moveFile(`uploads/${req.file.originalname}`, `uploads/${req.params['name']}/${req.file.originalname}`);
    res.status(200).send('Archivo guardado');
});


module.exports = routerMulter;