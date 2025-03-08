const http = require('http');
const { URL } = require('url');
const { WebSocketServer } = require('ws');
const uuidV4 = require("uuid").v4;

const server = http.createServer();
const WebSocket = new WebSocketServer({server});
const port = 8000;

const connections = {}
const users = {}


const broadcast = () =>{
    Object.keys(connections).forEach(uuid => {
        const connection = connections[uuid];
        const message = JSON.stringify(users);
        connection.send(message);
    })
}
const HandleMessage=(bytes ,uuid)=> {
    const message = JSON.parse(bytes.toString())
    const user = users[uuid]
    user.state = message;
    broadcast();
    console.log(message);

    console.log(`${user.username} updated their postion to  ${JSON.stringify(user.state)}`)


}

const HandleClose =(uuid)=>{
    console.log(`${users[uuid].username} disconnected`);
    delete connections[uuid]
    delete users[uuid]

    broadcast()
}

WebSocket.on("connection" ,(connection ,request)=>{
    const urlObj = new URL(request.url, "http://localhost"); // Use new URL() instead of URL.parse
    const username = urlObj.searchParams.get("username");
    const uuid = uuidV4()
    console.log(username);
    console.log(uuid);


    connections[uuid] = connection


    users[uuid] = {
        username ,
        state :{
        }
    }

    connection.on("message" , message => HandleMessage(message , uuid))
    connection.on("close",()=> HandleClose(uuid))
}) 

server.listen(port ,()=>{
    console.log(`listening to port ${port}`)
})

