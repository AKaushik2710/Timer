import { useState, useRef } from "react";
import Div from "../Div";
import Para from "../Para";
import Button from "../Button"
import "./index.css"
export default function Timer(){
    const [timer, setTimer] = useState({time:{hour : 0, min : 0, seconds : 5}, pause : false});
    const timeRef = useRef();

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
    return <>
    <Div id="timer">
        <Div cn="display">
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
    </Div>
    </>
}