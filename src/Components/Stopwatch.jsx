import { useEffect, useRef, useState } from "react";
import Div from "./Div";
import Para from "./Para";
export default function Stopwatch(){
    const [stopwatch, setStopwatch] = useState({seconds : 57, pause : false, min : 59, hour : 0});
    useEffect(()=>{
        let min = stopwatch.min;
        if(++min === 61){
            setStopwatch({...setStopwatch, min : 0, seconds : 0, hour : stopwatch.hour+1});
            setter();
        }
        else{
        stopwatch.seconds < 60 ? setter() : setStopwatch({...stopwatch, seconds : 0, min : stopwatch.min+1});
        }
        return () => clearInterval(secondsRef.current)
    },[stopwatch.seconds])

    let secondsRef = useRef();
    function setter(){
        secondsRef.current = setInterval(()=>{
            setStopwatch(stopwatch => {return {...stopwatch,seconds :stopwatch.seconds+1}});
        },1000)
    }

    function handlePause(val){
        if(val){
            setStopwatch({...stopwatch, pause : true});
            clearInterval(secondsRef.current)
        }
        else{
            setStopwatch({...stopwatch, pause : false})
            setter();
        }
    }
    function handleRestart(){
        setStopwatch({...stopwatch, seconds : 0, min : 0, hour : 0})
    }
    return <>
    <Div id="stopwatch">
        <Div id="display">{stopwatch.hour}{":"}{stopwatch.min}{":"}{stopwatch.seconds}</Div>
        <Div id="functionality">
            <Para id="pause" clickHandler={()=>handlePause(!stopwatch.pause)}>{stopwatch.pause ? "Play" : "Pause"}</Para>
            <Para id="restart" clickHandler={handleRestart}>{"Restart"}</Para>
        </Div>
    </Div>
    </>
}