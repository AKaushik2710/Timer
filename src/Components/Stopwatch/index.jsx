import { useEffect, useRef, useState } from "react";
import Div from "../Div";
import Para from "../Para";
import Button from "../Button"
import styles from './index.module.css'
export default function Stopwatch(){
    // stopwatch state for storing hours, minutes & seconds along with determinance of pause/play state
    const [stopwatch, setStopwatch] = useState({seconds : 0, pause : true, min : 0, hour : 0});

    // Catched Flags State
    const [flags, setFlags] = useState([]);

    // useEffect to imply the proper attaching and removal of Interval 
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

    // Ref use for proper clearance of Interval after render
    let secondsRef = useRef();

    // Interval Setter Fucntion
    function setter(){
        secondsRef.current = setInterval(()=>{
            setStopwatch(stopwatch => {return {...stopwatch,seconds :stopwatch.seconds+1}});
        },1000)
    }

    // Click Functionality of Pause/Play button
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

    // Restart Functionality
    function handleRestart(){
        setStopwatch({...stopwatch, seconds : 0, min : 0, hour : 0})
    }

    // Catching Flags Functionality
    function handleFlags(){
        setFlags([...flags, `${stopwatch.hour}  :  ${stopwatch.min}  :  ${stopwatch.seconds}`])
    }
    return <>
    <Div id={styles.stopwatch}> {/* Stopwatch App */}
    <Div id={styles.info}> {/* Info Holder */}
        <Div id={styles.display}> {/* Time Displayer */}
            <Div cn={styles.time_holder}> {/* Time Holder for Hour */}
                <Para cn={styles.time}>{stopwatch.hour} <span className={styles.txt}>{"Hour"}</span></Para> {/* Current Hour */}
                <Para cn={styles.sep}>{":"}</Para> {/* Separator */} 
            </Div>
            <Div cn={styles.time_holder}> {/* Time Holder for Minute */}
                <Para cn={styles.time}>{stopwatch.min}<span className={styles.txt}>{"Min"}</span></Para> {/* Current Minute */}
                <Para  cn={styles.sep}>{":"}</Para> {/* Separator */}
            </Div>
            <Div cn={styles.time_holder}> {/* Time Holder for Seconds */}
                <Para cn={styles.time}>{stopwatch.seconds}<span className={styles.txt}>{"Seconds"}</span></Para> {/* Current Seconds */}
            </Div>
        </Div>
        <Div id={styles.functionality}> {/* Functionaloty Holder */}
            <Button id={styles.pause} clickHandler={()=>handlePause(!stopwatch.pause)}>{stopwatch.pause ? "Play" : "Pause"}</Button> {/* Play/Pause Button*/}
            <Button id={styles.restart} clickHandler={handleRestart}>{"Restart"}</Button> {/* Restart Button */}
            <Button ds={stopwatch.pause ? true : false} clickHandler={handleFlags}>{"Catch"}</Button> {/* Catch Time Button */}
        </Div>
    </Div>
    {flags.length>0 ? (<Div id={styles.catcher}> {/* Catched Time Holder */}
                {flags.map((flag, index)=>{
                    return <><Para key={index} cn={styles.catches}><span className={styles.indexing}>{index+1+"."}</span>{flag}</Para> {/* Catched Times */} </>
                })}
    </Div>) : null}
    </Div>
    </>
}