const db = require("../config/db")
// const connectDB = require("../config/mongodb")
// const Chat = require("../config/model")
// const accountSid = "AC892d55e0019731818606588b3bc8188e";
// const authToken = "54fd96d416b934a50463706b43aed0e7";
// const client = require('twilio')(accountSid, authToken);

// const sendMessagetoUser = (req, res) => {

//     client.messages
//         .create({
//             body: "What's up",
//             from: 'whatsapp:+14155238886',
//             to: 'whatsapp:+9187928 58354'
//         })
//         .then(message => console.log(message.sid))
//         .catch((error) => console.error(error));
//     res.send("Message sent")

// }

const sendMessagetoServer = async(req, res) => {
    console.log(req.body)
    const msg = req.body.message;
    const state = req.body.state;
    // connectDB()
    // let chat = new Chat({
    //     sender: "user",
    //     receiver: "server",
    //     message: msg
    // })
    // await chat.save();


    if(msg === "Hello"||msg==="Hi"||msg==="Hey"||msg==="Hey there"||msg==="Hello there"||msg=="hi"||state===0){
        // chat = new Chat({
        //     sender: "server",
        //     receiver: "user",
        //     message: "Hello How may I help you?"
        // })
        // await chat.save();
        res.send({msg:"Hello How may I help you?", state:1})
        return;
    }
    else if(msg==="I want fruit supplies"||msg==="I need fruit supplies") 
    {
        // chat = new Chat({
        //     sender: "server",
        //     receiver: "user",
        //     message: "Please Enter the fruits required with space in between"
        // })
        // await chat.save();
        res.send({msg:"Please Enter the fruits required with space in between", state:2})
        return;
    }
    else if(state===2)
    {
        
        let split = msg.split(',');
        let fruitsWithQuantity = [];
        split.map((d)=>{
            let s = d.split(' ');
            fruitsWithQuantity.push({name:s[0], quantity:s[1]});
        })
        console.log(split)
        let response = "";
        await Promise.all(fruitsWithQuantity.map(async(fruit)=>{
            let sql =  `select fruitId from fruitDetails where nameOfFruit="${fruit.name}"`;
            let [data,_] = await db.execute(sql)
            console.log("Hi", data)
            if(data.length==0)
            {
                // chat = new Chat({
                //     sender: "server",
                //     receiver: "user",
                //     message: "Couldn't find fruit, please try again"
                // })
                // await chat.save();
                res.send({msg:"Couldn't find fruit, please try again", state:1})
                return;
            }
            console.log(data[0]);
            let fruitId=data[0]["fruitId"];

            sql =  `select supplierId, min(supplierPrice) from fruitSupplies where fruitToSellId=${fruitId} and supplierQuantity >= ${fruit.quantity} group by supplierId`;
            [data,_] = await db.execute(sql)
            console.log(data);
            let min =data[0]["min(supplierPrice)"];
            let ind= data[0]["supplierId"]
            console.log(min, ind, "HII");
            data.map((o)=>{
                if( o["min(supplierPrice)"] < min){
                    min = o["min(supplierPrice)"];
                    ind = o["supplierId"];
                }
            })
            console.log(min, ind, "HII");
            let price = min;
            sql = `select supplierName from suppliers where supplierId=${ind}`;
            [data,_] = await db.execute(sql)
            
            response = response + "Notified " + data[0].supplierName + " to supply " + fruit.quantity + "Kg of " + fruit.name + " at Rs." + price + " per Kg" + "\n\n";
        }))
        // chat = new Chat({
        //     sender: "server",
        //     receiver: "user",
        //     message: response
        // })
        // await chat.save();
        res.send({msg:response, state:1})   
        return;
    }
    else if(state===0)
    {
        // chat = new Chat({
        //     sender: "server",
        //     receiver: "user",
        //     message: "Sorry I didn't understand, expecting fruit names with quantity in Kg"
        // })
        // await chat.save();
        res.send({msg:"Sorry I didn't understand, expecting fruit names with quantity in Kg", state:1})
        return;
    }
    // const chating = new Chat({
    //     sender: "server",
    //     receiver: "user",
    //     message: "Sorry I didn't understand"
    // })
    // await chating.save();
    res.send({msg:"Sorry I didn't understand", state:1})
    //res.send("Message sent")
}

module.exports = {  sendMessagetoServer, }
