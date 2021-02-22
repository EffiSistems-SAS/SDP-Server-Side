const MongoController = require("../controllers/MongoController");

let mongoController = new MongoController();

const verifArchivoExistente = async (req, res, next) => {
    console.log(req.file);
    if (req.file === undefined) {
    console.log('Error FUCK');
    res.status(400).send("Ha ocurrido un error");
  } else {
    console.log("Llego");
    let registros = await mongoController.obtenerRegistros(req.params["id"]);
    if (registros.length === 0 || registros === null) {
      console.log("Llego 1");
      next();
    } else {
      console.log("Llego 2");
      console.log(registros);
      res.status(202).send("Record updated");
    }
  }
};

module.exports = {
  verifArchivoExistente,
};
