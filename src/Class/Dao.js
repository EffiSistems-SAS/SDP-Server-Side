const pool = require("../lib/database");
const processDataImp = require("./processData");
let processData = new processDataImp(); 

class Dao {
    static sendRequest(query){
        return new Promise((resolve,reject)=>{
            pool.query(query,(err,res)=>{
                if(err) reject(err);
                else resolve(res);
            })
        })
    }

    static getAll(tabla){
        return Dao.sendRequest(`SELECT * FROM ${tabla};`);
    }

    static get(tabla, id){
        return Dao.sendRequest(`SELECT * FROM ${tabla} WHERE ${processData.getIdDB(tabla)} = ${id};`);
    }

    static create(tabla,body){
        return Dao.sendRequest(`INSERT INTO ${tabla} ${processData.getValueText(body)};`);
    }

    static edit(tabla,body,id){
        return Dao.sendRequest(`UPDATE FROM ${tabla} ${processData.getUpdateText(body)} WHERE ${processData.getIdDB(tabla)} = ${id};`);
    }

    static delete(tabla, id){
        return Dao.sendRequest(`DELETE FROM ${tabla} WHERE ${processData.getIdDB(tabla)} = ${id};`);
    }
}

module.exports = Dao;
