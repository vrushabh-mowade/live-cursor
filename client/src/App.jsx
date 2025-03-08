import './App.css'
import { Login } from '../component/Login'
import { Home } from '../component/Home'
import { useState } from 'react'

function App() {
  const [username ,setUsername ] = useState("");


  return (
    <>
    {username? 
    <>
      <Home username={username}/>
    </> : 
    <>
      <Login onSubmit={setUsername}/>
    </>}
   
    </>
  )
}

export default App
