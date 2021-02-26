const mongoose = require("mongoose");
const MongoURI = require("../private/credentialsDB");

//const conn = mongoose.createConnection(MongoURI);

module.exports =() => {
    mongoose.connect(MongoURI,{
        useNewUrlParser:true,
        useUnifiedTopology: true
    }).then(() => {
        console.log(MongoURI);
        console.log('Base de datos conectada');
    }).catch(() => {
        console.log('Error en la conexión de la base de datos');
    });
};