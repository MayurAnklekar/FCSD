// const http = require('http')
// const fs = require('fs')
const SerialPort = require('serialport');
const parsers =  SerialPort.parsers;
const parser = new parsers.Readline({ delimiter: '\r\n' });

const app = require('express')();

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors:{
        origin: '*'
    }
});

io.on("connection", socket => {
    // socket.on("chat", (payload)=>{
    //     console.log(payload);
    //     io.emit("chat", payload);
    // })
    console.log("New client connected");
})

var port  = new SerialPort('/dev/cu.usbmodem11201', {
    baudRate: 9600,
    databits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);

// const app = http.createServer(function(req,res){
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end(index);
// })

//const io = require('socket.io')(app);

// io.on('connection', function(data){
//     console.log("Nodejs is listening");
// })

parser.on('data', function(data) {
    console.log(data);
    io.emit('data', data);
})

//app.listen(3000);

server.listen(5000, ()=>{
    console.log("Nodejs is listening")
})