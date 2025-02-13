import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Stopwatch from './Components/Stopwatch'
import Timer from './Components/Timer'
import Chooser from './Components/Choose'
import Div from './Components/Div'
import Para from './Components/Para'
function App() {
  // Setting Current App & Display of Chooser
  const [isIst, setIsIst] = useState({times : true, choose : false})

  // Swapping Function
  function handleSwap(val, swap=false){
    !swap ? setIsIst({choose : false, times : val}) : setIsIst({...isIst, choose : true});
  }
  return <>
  <Div clickHandler={()=>handleSwap(isIst.times, false)}> {/* Stopwatch/Timer Holder */}
    <Para id="hamburger" clickHandler={(e)=> {e.stopPropagation(); handleSwap(undefined,true)}}>&#9776;</Para> {/* Hamburger For Swap */}
    <Div id="swapper"> {/* Swap Option Holder */}
      {isIst.choose ? <Chooser handleSwap={handleSwap}></Chooser> : null} {/* Swap Options */}
    </Div>
    {isIst.times ? (<Stopwatch></Stopwatch>) : <Timer></Timer>} {/* Stopwatch/Timer */}
  </Div>
  </>
}

export default App
