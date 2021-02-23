const { Router } = require('express');
const MongoController = require('../controllers/MongoController');
const { searchIdFile } = require('../functions/historialMiddlewares');

const historialRouter = Router();
let controller = new MongoController();

historialRouter.put('/edit/:fileName',searchIdFile,(req,res) => {
    

});


module.exports = historialRouter;