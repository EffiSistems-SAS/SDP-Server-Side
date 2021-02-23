const { Router } = require('express');
const routerMulter = Router();
const reciveFiles = require('../functions/receiveFiles');
const multer = require('multer');
const moveFile = require('move-file');
const path = require('path');
const fs = require('fs');
const { formatString } = require('../functions/proccesData');

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

routerMulter.delete('/delete/:empName/:fileName?',(req,res) => {
    let pathFinal = path.resolve('uploads',req.params["empName"],formatString(req.query.fileName));
    fs.unlink(pathFinal, (err) => {
        if(err)
            res.status(400).send('Un error ha ocurrido');
        res.status(200).send('File remove');
    })
    
});

module.exports = routerMulter;