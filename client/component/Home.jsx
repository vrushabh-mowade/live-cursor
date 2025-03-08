import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import throttle from 'lodash.throttle'
import { useRef } from 'react';
import { Cursor } from './Cursor';


const renderCursors = users => {
    return Object
      .keys(users)
      .map(uuid => {
        const user = users[uuid]
        return <Cursor 
          key={uuid} 
          
          userId={uuid} 
          point={[ user.state.x, user.state.y ]} />
      })
  }
  
  const renderUsersList = users => {
    return (
      <ul>
        {Object.keys(users).map(uuid => {
          return <li key={uuid}>{JSON.stringify(users[uuid])}</li>
        })}
      </ul>
    )
  }
  

export function Home({ username }) {  // Extract username from props
    const WS_URL = "ws://localhost:8000";

    
    const {sendJsonMessage ,lastJsonMessage} = useWebSocket(WS_URL, {
        queryParams: { username }
    });
    
    const THROTTLE = 50;
    const  sendJsonMessageThrottle = useRef(throttle(sendJsonMessage,THROTTLE))
    useEffect(()=>{
        window.addEventListener("mousemove", e => {
            sendJsonMessageThrottle.current({
                x : e.clientX ,
                y : e.clientY
            })
        })
    },[])


    if (lastJsonMessage) {
        return <>
          {renderUsersList(lastJsonMessage)}
          {/* ideally batch updates */}
          {renderCursors(lastJsonMessage)}
        </>
      }
    
}
