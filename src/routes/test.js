const express = require("express");
const testRouter = express.Router();
const pool = require("../lib/database")
const Dao = require("../Class/Dao");
const {dataMiddleware} = require("../lib/middlewares");

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

testRouter.post("/",dataMiddleware,(req,res) => {
  Dao.create(`"TablaPrueba"`,req.values).then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
})

module.exports = testRouter;