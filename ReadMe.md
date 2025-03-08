## Live-cursor 

This project is a WebSocket-based implementation where the cursor location is shared over the server by establishing a WebSocket connection. It also provides a list of active users.

## Tech Stack


###### Client (React)

React - Frontend framework
react-use-websocket - Implementation of WebSocket with React
cursor-pointer - Ensures proper display of the cursor pointer
lodash.throttle - Creates a smooth cursor effect by throttling updates

###### Server (Node.js)
ws - WebSocket implementation in Node.js


## Run Code 

### client
```
cd client
npm install 
npm run dev
```


### server
```
cd server
npm install
npm run dev
```


### Features:
- Real-time cursor tracking across multiple users
- WebSocket-based communication for low-latency updates
- Active users list displayed in real-time
- Smooth cursor movement using throttling
