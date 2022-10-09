const io = require('socket.io')(5000,{
    cors:{
        origin:'http://localhost:3000',
        method: ["GET","POST"]
    },
});

io.on("connection",(socket)=>{
    socket.on("get-document",(documentId)=>{
        socket.join(documentId)
        socket.on("send-changes",(delta)=>{
            socket.broadcast.to(documentId).emit("recive-changes",delta)
        })
    })
    console.log("Connected....")
});