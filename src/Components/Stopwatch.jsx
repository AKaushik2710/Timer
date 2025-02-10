import { useEffect, useRef, useState } from "react";
import Div from "./Div";
import Para from "./Para";
export default function Stopwatch(){
    const [stopwatch, setStopwatch] = useState({time : 0, pause : false});
    useEffect(()=>{
        stopwatch.time < 61 ? setter() : setStopwatch({...stopwatch, time : 0});
        return () => clearInterval(timeRef.current);
    },[stopwatch.time])

    let timeRef = useRef();
    function setter(){
        timeRef.current = setInterval(()=>{
            setStopwatch(stopwatch => {return {...stopwatch,time :stopwatch.time+1}});
        },1000)
    }
    function handlePause(val){
        if(val){
            setStopwatch({...stopwatch, pause : true});
            clearInterval(timeRef.current)
        }
        else{
            setStopwatch({...stopwatch, pause : false})
            setter();
        }
    }
    return <>
    <Div id="stopwatch">
        <Div id="display">{stopwatch.time}</Div>
        <Div id="functionality">
            <Para id="pause" clickHandler={()=>handlePause(!stopwatch.pause)}>{"Pause"}</Para>
            <Para id="restart" clickHandler={()=> setStopwatch({...stopwatch, time : 0})}>{"Restart"}</Para>
        </Div>
    </Div>
    </>
}