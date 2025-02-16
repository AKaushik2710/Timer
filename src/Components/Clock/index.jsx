import { useEffect, useState } from "react";
import Div from "../Div";
import Para from "../Para";
import styles from "./index.module.css";
import clock from "../../assets/clock.png";
import Button from "../Button";

export default function Clock() {
    const [time, setTime] = useState( {tm : new Date(), rotate : {sec :new Date().getSeconds()*6+"deg", min : new Date().getMinutes()*6+"deg", hour : new Date().getHours()*30+"deg"}});
    const [alarmTime, setAlarm] = useState({alarms : [], time : {hours : new Date().getHours()%12, minutes : new Date().getMinutes(), seconds : new Date().getSeconds()}});

    useEffect(() => {
        const interval = setInterval(() => {
        setTime({tm : new Date(), rotate : {sec :new Date().getSeconds()*6+"deg", min : new Date().getMinutes()*6+"deg", hour : new Date().getHours()*30+"deg"}});
        }, 1000);
    
        return () => {
        clearInterval(interval);
        };
    }, []);
    
    useEffect(()=>{
        const interval = setInterval(()=>{
            
        })
    })

    return (
        <>
        <Div id={styles.clock}>
            <Div id={styles.circle}>
                {/* <img src={clock} width="500px" height="500px" style={{mixBlendMode : "multiply", color : "red"}}></img> */}
                {/* <Para id={styles.arr}>&rarr;</Para> */}
                <p id={styles.dial}></p>
                <p id={styles.sec} style={{rotate : time.rotate.sec}}></p>
                <p id={styles.min} style={{rotate : time.rotate.min}}></p>
                <p id={styles.hour} style={{rotate : time.rotate.hour}}></p>
            </Div>
            {/* <Div>
                <Para>{}</Para>
                <Para>{time.tm.getMinutes()}</Para>
                <Para>{time.tm.getSeconds()}</Para>
            </Div> */}
            <Div>
                <Para id={styles.time}>{time.tm.toLocaleTimeString()}</Para>
            </Div>
            <Div id={styles.alarm}>
                {/* <Para id={styles.alarmHours}>{alarmTime.time.hours}</Para>
                <Button id={styles.al}>&#9660;&#9650;</Button> */}
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
        </Div>
        </>
    );
    }