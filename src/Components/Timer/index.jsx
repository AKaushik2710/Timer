import { useState, useRef, useEffect } from "react";
import Div from "../Div";
import Para from "../Para";
import Button from "../Button"
import  styles from "./index.module.css"
export default function Timer(){
    // timer state for storing hours, minutes & seconds along with determinance of pause/play state
    const [timer, setTimer] = useState({time:{hour : 0, min : 0, seconds : 0}, pause : true});
    
    // Ref use for proper clearance of Interval after render
    const timeRef = useRef();

    // useEffect to imply the proper attaching and removal of Interval 
    useEffect(() => {
        if (!timer.pause) { // So that Interval is attached only when timer is not paused
            timeRef.current = setInterval(() => {
                setTimer((prevTimer) => {
                    const { hour, min, seconds } = prevTimer.time;
                    if (seconds > 0) {
                        // Returns in the case when seconds are still remaining
                        return { ...prevTimer, time: { ...prevTimer.time, seconds: seconds - 1 } };
                    } else if (min > 0) {
                        // Returns in the case when seconds are not but minutes are still remaining
                        return { ...prevTimer, time: { hour, min: min - 1, seconds: 59 } };
                    } else if (hour > 0) {
                        // Returns in the case when seconds & minutes are not but hours are still remaining
                        return { ...prevTimer, time: { hour: hour - 1, min: 59, seconds: 59 } };
                    } else {
                        // Clears the interval in case the timer ends and pause the timer
                        clearInterval(timeRef.current);
                        return { ...prevTimer, pause: true };
                    }
                });
            }, 1000);
        }
        return () => clearInterval(timeRef.current);
    }, [timer.pause]);

    // For Lessening of timer
    function handleUpClicks(obj){
        switch (obj.time){
            case "hour" :
                setTimer({...timer, time : {...timer.time, hour : timer.time.hour-1}})
            break;
            case "min" :
                setTimer({...timer, time : {...timer.time, min : timer.time.min-1}});
            break;
            case "seconds" :
                setTimer({...timer, time : {...timer.time, seconds : timer.time.seconds-1}});
            break;
        }
    }

    // For Increase of timer
    function handleDownClicks(obj){
        switch (obj.time){
            case "hour" :
                setTimer({...timer, time : {...timer.time, hour : timer.time.hour+1}})
            break;
            case "min" :
                setTimer({...timer, time : {...timer.time, min : timer.time.min+1}});
            break;
            case "seconds" :
                setTimer({...timer, time : {...timer.time, seconds : timer.time.seconds+1}});
            break;
        }
    }

    // Click Functionality of Pause/Play button
    function handlePause(){
        if(timer.pause){
            setTimer({...timer, pause : false});
        }
        else{
            setTimer({...timer, pause : true});
            clearInterval(timeRef.current)
        }
    }

    // Resets timer to ZERO
    function handleReset(){
        setTimer({...timer, time : {hour : 0, min : 0, seconds : 0}})
    }

    // Adds 10s worth of time to timer
    function handleAddition(){
        const valid = timer.time;
        function changeValues (){
            let values={};
            const isTrue = valid.seconds+10 > 60;
            // if seconds are within completion of a minute add time & if not increase the minute or the higher time unit while the adjusting their corresponding time values
            values.seconds = isTrue ? (valid.seconds+10)%60 : valid.seconds + 10;
            values.min = isTrue ? (valid.min < 59 ? valid.min+1 : (valid.min+1)%60) : valid.min;
            values.hour = isTrue && timer.time.min==59 ? 1 : 0;
            return values
        }
        let timeChange = changeValues();  
        setTimer({...timer, time : {hour : timer.time.hour+timeChange.hour, min : timeChange.min, seconds : timeChange.seconds}})
    }
    return <>
    <Div id={styles.timer}> {/* Timer App */}
        <Div id={styles.display}> {/* Display Section */}
            <Div cn={styles.time_holder}> {/* Time Holder for Hour */}
                <Button cn={styles.up_arr} ds={timer.time.hour >0 ? false : true} clickHandler={()=>handleUpClicks({time : "hour"})}>&#9650;</Button> {/* Increaing Hour */}
                <Para cn={`${styles.xtra} ${!timer.pause ? styles.hide : ''}`}>{timer.time.hour>0 ? timer.time.hour-1 : timer.time.hour}</Para> {/* Current Hour Value - 1 */}
                    <Para>{timer.time.hour}</Para> {/* Current Hour Value */}
                    <Para cn={`${styles.xtra} ${!timer.pause ? styles.hide : ''}`}>{timer.time.hour<59 ? timer.time.hour+1 : 0}</Para> {/* Current Hour Value + 1 */}
                <Button cn={styles.down_arr} clickHandler={()=> handleDownClicks({time : "hour"})}>&#9660;</Button> {/* Decreasing Hour */}
            </Div>
            <Div cn={styles.time_holder}> {/* Time Holder for Minute */}
                <Button cn={styles.up_arr} ds={timer.time.min >0 ? false : true} clickHandler={()=> handleUpClicks({time : "min"})}>&#9650;</Button> {/* Increasing Minute */}
                    <Para cn={`${styles.xtra} ${!timer.pause ? styles.hide : ''}`}>{timer.time.min>0 ? timer.time.min-1 : timer.time.min}</Para> {/* Current Minute Value - 1 */}
                    <Para>{timer.time.min}</Para> {/* Current Minute Value */}
                    <Para cn={`${styles.xtra} ${!timer.pause ? styles.hide : ''}`}>{timer.time.min<59 ? timer.time.min+1 : 0}</Para> {/* Current Minute Value + 1 */}
                <Button cn={styles.down_arr} clickHandler={()=> handleDownClicks({time : "min"})}>&#9660;</Button> {/* Decreasing Minute */}
            </Div>
            <Div cn={styles.time_holder}> {/* Time Holder for Seconds */}
                <Button cn={styles.up_arr} ds={timer.time.seconds >0 ? false : true} clickHandler={()=> handleUpClicks({time : "seconds"})}>&#9650;</Button> {/* Increasing Minute */}
                    <Para cn={`${styles.xtra} ${!timer.pause ? styles.hide : ''}`}>{timer.time.seconds>0 ? timer.time.seconds-1 : timer.time.seconds}</Para> {/* Current Seconds Value - 1 */}
                    <Para>{timer.time.seconds}</Para> {/* Current Seconds Value */}
                    <Para cn={`${styles.xtra} ${!timer.pause ? styles.hide : ''}`}>{timer.time.seconds<59 ? timer.time.seconds+1 : 0}</Para> {/* Current Seconds Value + 1 */}
                <Button cn={styles.down_arr} clickHandler={()=> handleDownClicks({time : "seconds"})}>&#9660;</Button> {/* Decreasing Minute */}
            </Div>
        </Div>
        <Div id={styles.functionality}> {/* Functionality Section */}
            <Button clickHandler={handleAddition}>{"+10s"}</Button> {/* Second Adder */}
            <Button clickHandler={handlePause}>{timer.pause ? "Play" : "Pause"}</Button> {/* Play/Pause Button*/}
            <Button clickHandler={handleReset}>{"Reset"}</Button> {/* Resetting Button */}
        </Div>
    </Div>
    </>
}