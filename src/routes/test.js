const express = require("express");
const testRouter = express.Router();
const pool = require("../lib/database")
const Dao = require("../Class/Dao");

testRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

testRouter.get("/getRegistros", (req, res) => {
  Dao.get(`"TablaPrueba"`).then((data)=>{
    res.send(data);
  }).catch((err)=>{
    res.send(err);
  })
});

testRouter.post("/",(req,res) => {
  res.json({
    "status":200,
    "data":req.body
  });  
})

module.exports = testRouter;