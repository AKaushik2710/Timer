import { useState, useRef, useEffect } from "react";
import Div from "../Div";
import Para from "../Para";
import Button from "../Button"
import "./index.css"
export default function Timer(){
    const [timer, setTimer] = useState({time:{hour : 1, min : 0, seconds : 0}, pause : true});
    const timeRef = useRef();

    useEffect(() => {
        if (!timer.pause) {
            timeRef.current = setInterval(() => {
                setTimer((prevTimer) => {
                    const { hour, min, seconds } = prevTimer.time;
                    if (seconds > 0) {
                        return { ...prevTimer, time: { ...prevTimer.time, seconds: seconds - 1 } };
                    } else if (min > 0) {
                        return { ...prevTimer, time: { hour, min: min - 1, seconds: 59 } };
                    } else if (hour > 0) {
                        return { ...prevTimer, time: { hour: hour - 1, min: 59, seconds: 59 } };
                    } else {
                        clearInterval(timeRef.current);
                        return { ...prevTimer, pause: true };
                    }
                });
            }, 1000);
        }
        return () => clearInterval(timeRef.current);
    }, [timer.pause]);

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

    function handlePause(){
        if(timer.pause){
            setTimer({...timer, pause : false});
        }
        else{
            setTimer({...timer, pause : true});
            clearInterval(timeRef.current)
        }
    }

    function handleRestart(){
        setTimer({...timer, time : {hour : 0, min : 0, seconds : 0}})
    }
    function handleAddition(){
        const valid = timer.time;
        function changeValues (){
            let values={};
            const isTrue = valid.seconds+10 > 60;
            values.seconds = isTrue ? (valid.seconds+10)%60 : valid.seconds + 10;
            values.min = isTrue ? (valid.min < 59 ? valid.min+1 : (valid.min+1)%60) : valid.min;
            values.hour = isTrue && timer.time.min==59 ? 1 : 0;
            return values
        }
        let timeChange = changeValues();  
        setTimer({...timer, time : {hour : timer.time.hour+timeChange.hour, min : timeChange.min, seconds : timeChange.seconds}})
    }
    return <>
    <Div id="timer">
        <Div id="display">
            <Div cn="time_holder">
                <Button cn="up_arr" ds={timer.time.hour >0 ? false : true} clickHandler={()=>handleUpClicks({time : "hour"})}>&#9650;</Button>
                <Para>{timer.time.hour}</Para>
                <Button cn="down_arr" clickHandler={()=> handleDownClicks({time : "hour"})}>&#9660;</Button>
            </Div>
            <Div cn="time_holder">
            <Button cn="up_arr" ds={timer.time.min >0 ? false : true} clickHandler={()=> handleUpClicks({time : "min"})}>&#9650;</Button>
                <Para>{timer.time.min}</Para>
                <Button cn="down_arr" clickHandler={()=> handleDownClicks({time : "min"})}>&#9660;</Button>
            </Div>
            <Div cn="time_holder">
            <Button cn="up_arr" ds={timer.time.seconds >0 ? false : true} clickHandler={()=> handleUpClicks({time : "seconds"})}>&#9650;</Button>
                <Para>{timer.time.seconds}</Para>
                <Button cn="down_arr" clickHandler={()=> handleDownClicks({time : "seconds"})}>&#9660;</Button>
            </Div>
        </Div>
        <Div id="functionality">
            <Button clickHandler={handleAddition}>{"+10s"}</Button>
            <Button clickHandler={handlePause}>{timer.pause ? "Play" : "Pause"}</Button>
            {/* <Button clickHandler={handleRestart}>{"Restart"}</Button> */}
            <Button clickHandler={handleRestart}>{"Reset"}</Button>
        </Div>
    </Div>
    </>
}