const db = require("../config/db")

const getFruitPrices = async (req, res) => {

    let sql =  `SELECT * from fruitDetails`;

    const [data,_] = await db.execute(sql)

    const fruitPrices = {}

    data.map((d)=>{
        fruitPrices[d.nameOfFruit] = d.priceKg
    })


    res.send(fruitPrices)
}

const getFruitDetails = async (req, res) => {

    let sql =  `SELECT * from fruitDetails`;
    const [data,_] = await db.execute(sql);

    res.send(data)
}

const getDetailsById = async (req, res) => {
    const {id} = req.params;
    let sql =  `SELECT * from fruitDetails where fruitId = '${id}'`;
    const [data,_] = await db.execute(sql);
    res.send(data)
}


const updateFruit = async (req, res) => {
    const {id} = req.params;
    const {fruitName, price, remaining, adminId} = req.body;
    let sql =  `update fruitDetails set nameOfFruit = "${fruitName}", priceKg = ${price}, remaining = ${remaining} where fruitId = ${id}`;
    let [data,_] = await db.execute(sql);
    
    sql =  `select fruitId from fruitDetails where nameOfFruit = '${fruitName}'`;
    [data,_] = await db.execute(sql);
    const fruitId = data[0]["fruitId"];

    sql =  `insert into updateFruits (fruitId, adminId,modifiedQuantity,modifiedPrice,modifiedName) values (${fruitId}, ${adminId},${remaining},${price},"${fruitName}")`;
    [data,_] = await db.execute(sql);

    res.send(data)
}

const addFruit = async (req, res) => {
    const {fruitName, price, remaining, adminId} = req.body;
    let sql =  `insert into fruitDetails (nameOfFruit, priceKg, remaining) values ('${fruitName}', '${price}', '${remaining}')`;
    let [data,_] = await db.execute(sql);
    
    sql =  `select fruitId from fruitDetails where nameOfFruit = '${fruitName}'`;
    [data,_] = await db.execute(sql);
    const fruitId = data[0]["fruitId"];

    sql =  `insert into updateFruits (fruitId, adminId,modifiedQuantity,modifiedPrice,modifiedName) values (${fruitId}, ${adminId},${remaining},${price},"${fruitName}")`;
    [data,_] = await db.execute(sql);

    res.send(data)
}

module.exports = {getFruitPrices, getFruitDetails, updateFruit, addFruit, getDetailsById}