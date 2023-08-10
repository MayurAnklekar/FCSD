// const http = require('http')
const fs = require('fs')
const data = fs.readFileSync('../client/src/fruit.json', 'utf8')
const fruit = JSON.parse(data)
const SerialPort = require('serialport');
const mongoose = require('mongoose');
const cors = require("cors");
const express = require("express");
const { cloudinary } = require('./utils/cloudinary')
// const TeachableMachine = require("@sashido/teachablemachine-node");
const Schema = mongoose.Schema
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({ delimiter: '\r\n' });
const { exec } = require("child_process");
const { writeFileSync } = require("fs")


const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
});


app.use('/fruit', require("./routes/fruitRoutes"))
app.use('/user', require("./routes/userRoutes"))
app.use('/payment', require("./routes/paymentRoutes"))
app.use('/chatbot', require("./routes/chatbotRoutes"))





// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

// const fruitSchema=new Schema({
//     name :{
//       type : String,
//       required : true
//     },
//     price : {
//       type: Number,
//       required : true
//     },
//     image :{
//       type : String,
//       required: true
//     }

// })

// const Fruit = mongoose.model("Fruit ", fruitSchema);

// setInterval(async() => {
//     let Fruits= await Fruit.find();
//     let fri = {}
//     Fruits.forEach(fruit => {
//         fri[fruit.name]=fruit.price
//     })
//     var dod = JSON.stringify(fri, null, 2);
//     console.log(fri);
//     fs.writeFile('../client/src/fruit.json', dod, ()=>{
//         console.log("File updated")
//     })

// }, 5000)

io.on("connection", socket => {
  //console.log("New client connected");
})

var port = new SerialPort('/dev/cu.usbserial-1140', {
  baudRate: 57600,
  databits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});

port.pipe(parser);

parser.on('data', function (data) {
  
  const arr = data.split(" ");
  let weight = arr[0];

  const distance = arr[1];
  if(Math.abs(weight)<0.5)
  {
    weight = Math.abs(weight)+0.5;
  }
  else
  {
    weight = Math.abs(weight/20);
  }
  console.log(Math.abs(weight), "Hi")
  io.emit("data", { w: weight, d: distance });
})

// const model = new TeachableMachine({
//    modelUrl: "https://teachablemachine.withgoogle.com/models/aSsfZvT63/"
//   //modelUrl: "https://teachablemachine.withgoogle.com/models/DDEsfzWnK/"
// });

  // app.post('/upload', async (req, res) => {

  //   console.log(req.body)
  //   const { data } = req.body;
  //   const uploadResponse = await cloudinary.uploader.upload(data, { upload_preset: 'fruits' });
  //   // console.log(uploadResponse)
  //   const url = uploadResponse.url;
  //   res.send({ url: url })
  // });


  app.post("/image/classify", async (req, res) => {
    // console.log(req.body)
    const {data} = req.body;

    const base64Data = data.replace(/^data:image\/jpeg;base64,/, "");

    const image = Buffer.from(base64Data, "base64")
    writeFileSync("image.png", image)

    // console.log("image", data);

    const resp = exec("python ./model.py", (error, stdout, stderr) => {
      if (error) {

        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
      // console.log(`stdout: jhjhjhj ${stdout} hello`);
      //spll = stdout.split(" ")
      const arr = stdout.split("\n");
      console.log("I am array", arr[1])

      res.send({ fruit: arr[1] })
      return;
    });

    // console.log(data)
    // return model.classify({
    //   imageUrl: data,
    // }).then((predictions) => {
    //   console.log(predictions);
    //   return res.json(predictions);
    // }).catch((e) => {
    //   console.error(e);
    //   res.status(500).send("Something went wrong!")
    // });


  });







  // const app = http.createServer(function(req,res){
  //     res.writeHead(200, {'Content-Type': 'text/html'});
  //     res.end(index);
  // })

  //const io = require('socket.io')(app);

  // io.on('connection', function(data){
  //     console.log("Nodejs is listening");
  // })



  //app.listen(3000);

  server.listen(5000, () => {
    console.log("Nodejs is listening")
  })