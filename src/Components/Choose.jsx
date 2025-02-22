import Div from "./Div"
import Para from "./Para"

// Selection Functionality between Timer & Stopwatch 
export default function Chooser({handleSwap}){
    // handleChoices => Swapping Between Stopwatch & Timer
    return <>
    <Div id="chooser" clickHandler={(e)=> e.stopPropagation()}>
        <Para clickHandler={()=>handleSwap(true)}>{"Stopwatch"}</Para>
        <Para clickHandler={()=>handleSwap(false)}>{"Timer"}</Para>
    </Div>
    </>
}