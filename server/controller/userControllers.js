const db = require("../config/db")
const bcrypt = require("bcryptjs");

const adminLogin = async(req, res)=>{
    const { email, password } = req.body;

    let sql = `select * from admins where email = '${email}'`;

    const [data,_] = await db.execute(sql)

    if(data.length>0)
    {
        const user = data[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch)
        {
            res.send({userId:user.adminId})
            return;
        }
    }

    res.send({userId:-1})
}

const addUser = async (req, res) => {

    const {email, name} = req.body
     let sql =  `select count(*) as no from users where email = '${email}'`;

    let [data,_] = await db.execute(sql)

    console.log(data);

    if(data[0].no>0)
    {
        sql =  `select userId from users where email = '${email}'`;

        [data,_] = await db.execute(sql)
        console.log(data);
        res.send({userId:data[0]["userId"]})
        return;
    }
    

    sql =  `Insert into users (email,userName) values ("${email}", "${name}")`;

    [data,_] = await db.execute(sql)

    let ssql = `SELECT LAST_INSERT_ID();`

    const [data2,__] = await db.execute(ssql)

    console.log(data2[0]["LAST_INSERT_ID()"])

    // const fruitPrices = {}

    // data.map((d)=>{
    //     fruitPrices[d.nameOfFruit] = d.priceKg
    // })


    res.send({userId:data2[0]["LAST_INSERT_ID()"]})
}

module.exports = {addUser, adminLogin}