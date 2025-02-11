import { useEffect, useRef, useState } from "react";
import Div from "../Div";
import Para from "../Para";
import Button from "../Button"
import './index.css'
export default function Stopwatch(){
    const [stopwatch, setStopwatch] = useState({seconds : 0, pause : true, min : 0, hour : 0});
    const [flags, setFlags] = useState([]);
    useEffect(()=>{
        if(!stopwatch.pause){
        
        let min = stopwatch.min;
        if(++min === 61){
            setStopwatch({...setStopwatch, min : 0, seconds : 0, hour : stopwatch.hour+1});
            setter();
        }
        else{
        stopwatch.seconds < 60 ? setter() : setStopwatch({...stopwatch, seconds : 0, min : stopwatch.min+1});
        }
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
    function handleFlags(){
        setFlags([...flags, `${stopwatch.hour}  :  ${stopwatch.min}  :  ${stopwatch.seconds}`])
    }
    return <>
    <Div id="stopwatch">
    <Div id="info">
        <Div id="display">
            <Div cn="time_holder">
                <Para cn="time">{stopwatch.hour} <span className="txt">{"Hour"}</span></Para>
                <Para cn="sep">{":"}</Para>
            </Div>
            <Div cn="time_holder">
                <Para cn="time">{stopwatch.min}<span className="txt">{"Min"}</span></Para>
                <Para  cn="sep">{":"}</Para>
            </Div>
            <Div cn="time_holder">
                <Para cn="time">{stopwatch.seconds}<span className="txt">{"Seconds"}</span></Para>
            </Div>
        </Div>
        <Div id="functionality">
            <Button id="pause" clickHandler={()=>handlePause(!stopwatch.pause)}>{stopwatch.pause ? "Play" : "Pause"}</Button>
            <Button id="restart" clickHandler={handleRestart}>{"Restart"}</Button>
            <Button ds={stopwatch.pause ? true : false} clickHandler={handleFlags}>{"Catch"}</Button>
        </Div>
    </Div>
    <Div id="catcher">
                {flags.map((flag, index)=>{
                    return <Para key={index} cn="catches">{flag}</Para>
                })}
    </Div>
    </Div>
    </>
}