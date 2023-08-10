const db = require("../config/db")
const nodemailer = require("nodemailer");
const stripe = require('stripe')('sk_test_51Jt3ZNSGf79xGMwIxXrAzGYR73Tnpdzv12Mda5vyAYvGxka22UsLC3g2zV4OL3ihbELn2FQvsOA0eiYwVfdyR76b00m64JBdD9')

const addTransaction = async (req, res) => {

    console.log(req.body)
    const { total, userId, list } = req.body;
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'Fruits',
                    },
                    unit_amount: total * 100,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000',
        cancel_url: 'http://localhost:3000',
    });

    res.send({ url: session.url, })

    const id = session.id;
    const amount = total;
    const status = "success";

    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();

    let hh = d.getHours();
    let min = d.getMinutes();
    let ss = d.getSeconds();

    let date = yyyy + "-" + mm + "-" + dd + " " + hh + ":" + min + ":" + ss;

    let sql = `Insert into transactions (transactionId,amount,time,status) values ("${id}", "${amount}", "${date}", "${status}")`;
    let [data, _] = await db.execute(sql)


    sql = `insert into purchases (transactionId,userId) values ("${id}", "${userId}")`;
    [data, _] = await db.execute(sql)

    sql = "SELECT LAST_INSERT_ID()";
    [data, _] = await db.execute(sql)
    const purchaseId = data[0]["LAST_INSERT_ID()"];

    let fruitsRequired = [];

    await Promise.all (list.map(async (item) => {
        const fruitName = item.fruit;
        const weight = item.weight;
        sql = `select fruitId from fruitDetails where nameOfFruit="${fruitName}"`;
        [data, _] = await db.execute(sql)
        const fruitId = data[0]["fruitId"];
        sql = `select priceKg from fruitDetails where nameOfFruit="${fruitName}"`;
        [data, _] = await db.execute(sql)
        const priceOfFruit = data[0]["priceKg"];
        const price = priceOfFruit * weight;
        sql = `insert into fetchesFruit values (${fruitId},${purchaseId},${weight},${price})`;
        [data, _] = await db.execute(sql)
        sql = `select remaining from fruitDetails where nameOfFruit = '${fruitName}'`;
        [data, _] = await db.execute(sql)
        const remaining = data[0]["remaining"];
        const updateReamining = remaining - weight;
        if (updateReamining < 30) {
        fruitsRequired.push({name:fruitName,quantity:updateReamining});
        }
        console.log("Please print something", fruitsRequired)
        sql = `update fruitDetails set remaining = ${updateReamining} where nameOfFruit = '${fruitName}'`;
        [data, _] = await db.execute(sql)
    }))
    //console.log(fruitsRequired, "Hello op", fruitsRequired[0], fruitsRequired.length)
    let fruitsInHTML= ""
    for(let i=0;i<fruitsRequired.length;i++){
        let num = Math.floor(Math.random() * (150 - 100 + 1)) + 100;
        fruitsInHTML += `<li>${fruitsRequired[i].name} ,Current Quantity: ${fruitsRequired[i].quantity} Kg, Required Quantity ${num} Kg</li>`
        //console.log(fruitsRequired[i], fruitsInHTML,"Hello again");
    }

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: 'demotestrvce@gmail.com',
            pass: 'tevneuqwghhlsoah'
        },
    });

    

    console.log(fruitsInHTML, "HEllo")

    const html = `<!DOCTYPE html><html >
    <head>
        <meta charset="UTF-8">
        <style>
      table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        padding: 5px;
      }
    </style>
    </head>
    <body>
    <h3>We have noticed a shortage of below fruit(s) in our inventory, and we would like to request your assistance in selecting a reliable supplier who can provide us with the required quantity at a reasonable price.
    <br>
    <br>`
    + fruitsInHTML +
    `<br>
    <br>
    Thank you for your time and consideration.
    </h3>
    </body>
</html>
`;

   
    

    if(fruitsRequired.length>0)
    { 
        let info = await transporter.sendMail({
        from: 'demotestrvce@gmail.com', // sender address
        to: "karthikhallad@gmail.com", // list of receivers
        subject: "Request for Supplier Selection for Low Stock Fruits🍑 from RVCE FRUIT STORE", // Subject line
        text: "", // plain text body
        html: html, // html body
    });
    }
    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = { addTransaction }