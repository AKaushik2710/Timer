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
  const [isIst, setIsIst] = useState({times : true, choose : false})
  function handleSwap(val, swap=false){
    !swap ? setIsIst({choose : false, times : val}) : setIsIst({...isIst, choose : true});
  }
  return <>
  <Div clickHandler={()=>handleSwap(isIst.times, false)}>
    <Para id="hamburger" clickHandler={(e)=> {e.stopPropagation(); handleSwap(undefined,true)}}>&#9776;</Para>
    <Div id="swapper">
      {isIst.choose ? <Chooser handleSwap={handleSwap}></Chooser> : null}
    </Div>
    {isIst.times ? (<Stopwatch></Stopwatch>) : <Timer></Timer>}
  </Div>
  </>
}

export default App
