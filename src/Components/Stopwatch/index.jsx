import { useEffect, useRef, useState } from "react";
import Div from "../Div";
import Para from "../Para";
import Button from "../Button"
import styles from './index.module.css'
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
    <Div id={styles.stopwatch}>
    <Div id={styles.info}>
        <Div id={styles.display}>
            <Div cn={styles.time_holder}>
                <Para cn={styles.time}>{stopwatch.hour} <span className={styles.txt}>{"Hour"}</span></Para>
                <Para cn={styles.sep}>{":"}</Para>
            </Div>
            <Div cn={styles.time_holder}>
                <Para cn={styles.time}>{stopwatch.min}<span className={styles.txt}>{"Min"}</span></Para>
                <Para  cn={styles.sep}>{":"}</Para>
            </Div>
            <Div cn={styles.time_holder}>
                <Para cn={styles.time}>{stopwatch.seconds}<span className={styles.txt}>{"Seconds"}</span></Para>
            </Div>
        </Div>
        <Div id={styles.functionality}>
            <Button id={styles.pause} clickHandler={()=>handlePause(!stopwatch.pause)}>{stopwatch.pause ? "Play" : "Pause"}</Button>
            <Button id={styles.restart} clickHandler={handleRestart}>{"Restart"}</Button>
            <Button ds={stopwatch.pause ? true : false} clickHandler={handleFlags}>{"Catch"}</Button>
        </Div>
    </Div>
    {flags.length>0 ? (<Div id={styles.catcher}>
                {flags.map((flag, index)=>{
                    return <Para key={index} cn={styles.catches}><span className={styles.indexing}>{index+1+"."}</span>{flag}</Para>
                })}
    </Div>) : null}
    </Div>
    </>
}