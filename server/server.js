const io = require('socket.io')(5000,{
    cors:{
        origin:'http://localhost:3000',
        method: ["GET","POST"]
    },
});

io.on("connection",(socket)=>{
    console.log("Connected....")
});