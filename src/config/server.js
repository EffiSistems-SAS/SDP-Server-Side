const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

const fileRouter = require('../routes/fileRouter');
const authRouter = require('../routes/authRouter');
const multerRouter = require('../routes/multerRouter');
const routerAdmin = require('../routes/adminOpsRouter');
const routerRegistros = require('../routes/registroRouter');


module.exports = (app) => {

  //Configuración inicial de datos que recibe el servidor
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.raw());

  //Configuración de peticiones del servidor
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin,X-Request-With,Content-Type,Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    next();
  });

  //Configuración end points del servidor
  app.use('/files',fileRouter);
  app.use('/auth',authRouter);
  app.use('/multer',multerRouter);
  app.use('/adminOps',routerAdmin);
  app.use('/registros',routerRegistros);


  //Inicializando aplicación en el puerto dado por el entorno
  app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`);
  });
};
