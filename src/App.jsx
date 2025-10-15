import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LiquidEther from "./Components/LiquidEther.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="w-full grid justify-items-center items-center z-1 ">
        <div className="z-1">Content</div>
      </div>
  )
}

export default App
