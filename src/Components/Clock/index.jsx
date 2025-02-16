import { useEffect, useState } from "react";
import Div from "../Div";
import Para from "../Para";
import styles from "./index.module.css";
import clock from "../../assets/clock.png";
import Button from "../Button";

export default function Clock() {
    const [time, setTime] = useState( {tm : new Date(), rotate : {sec :new Date().getSeconds()*6+"deg", min : new Date().getMinutes()*6+"deg", hour : new Date().getHours()*30+"deg"}});
    const [alarmTime, setAlarm] = useState({alarms : {index : [], actual : []}, time : {hour : new Date().getHours()%12, min : new Date().getMinutes()}, ask :false});

    useEffect(() => {
        const interval = setInterval(() => {
        setTime({tm : new Date(), rotate : {sec :new Date().getSeconds()*6+"deg", min : new Date().getMinutes()*6+"deg", hour : new Date().getHours()*30+"deg"}});
        }, 1000);
    
        return () => {
        clearInterval(interval);
        };
    }, []);
    
    useEffect(()=>{
        setAlarm({...alarmTime, time : {hour : new Date().getHours()%12, min : new Date().getMinutes()}});
    },[alarmTime.alarms.actual])

    function handleUpClicks(obj){
        switch (obj.time){
            case "hour" :
                setAlarm({...alarmTime, time : {...alarmTime.time, hour : alarmTime.time.hour-1}})
            break;
            case "min" :
                setAlarm({...alarmTime, time : {...alarmTime.time, min : alarmTime.time.min-1}});
            break;
        }
    }

    function handleDownClicks(obj){
        switch (obj.time){
            case "hour" :
                setAlarm({...alarmTime, time : {...alarmTime.time, hour : alarmTime.time.hour+1}})
            break;
            case "min" :
                setAlarm({...alarmTime, time : {...alarmTime.time, min : alarmTime.time.min+1}});
            break;
        }
    }

    function idGenerator(notes){ // NOTE'S ID GENERATOR
        const arr = [...notes];
        const result = arr.length !== 0 ? arr[arr.length -1].id + 1 : 1
        return result;
    }

    function handleAlarmSetting(){
        setAlarm({...alarmTime, ask : true, alarms : {...alarmTime.alarms, actual : [...alarmTime.alarms.actual,  {id : idGenerator(alarmTime.alarms.actual), time : alarmTime.time}]}});
    }
    return (
        <>
        <Div id={styles.clock}>
            <Div id={styles.clock_holder}>
                <Div id={styles.circle}>
                    {/* <img src={clock} width="500px" height="500px" style={{mixBlendMode : "multiply", color : "red"}}></img> */}
                    {/* <Para id={styles.arr}>&rarr;</Para> */}
                    <Para id={styles.dial}></Para>
                    <Para id={styles.sec} style={{rotate : time.rotate.sec}}></Para>
                    <Para id={styles.min} style={{rotate : time.rotate.min}}></Para>
                    <Para id={styles.hour} style={{rotate : time.rotate.hour}}></Para>
                </Div>
                <Div id={styles.time_string}>
                    <Para id={styles.time}>{time.tm.toLocaleTimeString()}</Para>
                </Div>
            </Div>
            <Div id={styles.alarm_setter}>
                <Div id={styles.alarm_ask_holder} cn={alarmTime.ask ? '' : styles.hide}>
                    <Button id={styles.alarm_ask} clickHandler={()=> setAlarm({...alarmTime, ask : false})}>{"Set An Alarm"}</Button>
                </Div>
                <Div id={styles.alarm_time} cn={alarmTime.ask ? styles.hide : ''}>
                    <Div cn={styles.alarm_holder}> {/* Alarm Holder for Hour */}
                        <Button cn={styles.up_arr} ds={alarmTime.time.hour >0 ? false : true} clickHandler={()=>handleUpClicks({time : "hour"})}>&#9650;</Button> {/* Increaing Hour */}
                            <Para cn={`${styles.xtra} ${!alarmTime.pause ? styles.hide : ''}`}>{alarmTime.time.hour>0 ? alarmTime.time.hour-1 : alarmTime.time.hour}</Para> {/* Current Hour Value - 1 */}
                            <Para>{alarmTime.time.hour}</Para> {/* Current Hour Value */}
                            <Para cn={`${styles.xtra} ${!alarmTime.pause ? styles.hide : ''}`}>{alarmTime.time.hour<59 ? alarmTime.time.hour+1 : 0}</Para> {/* Current Hour Value + 1 */}
                        <Button cn={styles.down_arr} clickHandler={()=> handleDownClicks({time : "hour"})}>&#9660;</Button> {/* Decreasing Hour */}
                    </Div>
                    <Div cn={styles.alarm_holder}> {/* Alarm Holder for Minute */}
                        <Button cn={styles.up_arr} ds={alarmTime.time.min >0 ? false : true} clickHandler={()=> handleUpClicks({time : "min"})}>&#9650;</Button> {/* Increasing Minute */}
                            <Para cn={`${styles.xtra} ${!alarmTime.pause ? styles.hide : ''}`}>{alarmTime.time.min>0 ? alarmTime.time.min-1 : alarmTime.time.min}</Para> {/* Current Minute Value - 1 */}
                            <Para>{alarmTime.time.min}</Para> {/* Current Minute Value */}
                            <Para cn={`${styles.xtra} ${!alarmTime.pause ? styles.hide : ''}`}>{alarmTime.time.min<59 ? alarmTime.time.min+1 : 0}</Para> {/* Current Minute Value + 1 */}
                        <Button cn={styles.down_arr} clickHandler={()=> handleDownClicks({time : "min"})}>&#9660;</Button> {/* Decreasing Minute */}
                    </Div>
                </Div>
                <Div id={styles.alarm_set_button} cn={alarmTime.ask ? styles.hide : ''}>
                    {(!alarmTime.ask) ? (<><Button id={styles.alarm_set} clickHandler={handleAlarmSetting}>{"Set Alarm"}</Button>
                        <Button id={styles.alarm_cancel} clickHandler={()=> setAlarm({...alarmTime, ask : true})}>{"Cance"}</Button></>) : null
                    }
                </Div>
            </Div>
            <Div>
                {alarmTime.alarms.actual.map((alarm) => {
                    return <Para key={alarm.id}>{`${alarm.time.hour}:${alarm.time.min}`}</Para>
                })}
            </Div>
        </Div>
        </>
    );
    }