import { useEffect, useState, useRef } from "react";
import Div from "../Div";
import Para from "../Para";
import styles from "./index.module.css";
import clock from "../../assets/clock.png";
import Button from "../Button";

export default function Clock() {
    const [time, setTime] = useState( {tm : new Date(), rotate : {sec :new Date().getSeconds()*6+"deg", min : new Date().getMinutes()*6+"deg", hour : new Date().getHours()*30+"deg"}});
    const [alarmTime, setAlarm] = useState({alarms : {index : [], actual : []}, time : {hour : new Date().getHours()%12, min : new Date().getMinutes(), seconds : 0, half : "A.M."}, ask :false});
    const clockRef = useRef();
    const alarmRef = useRef();
    useEffect(() => {
        clockRef.current = setInterval(() => {
        setTime({tm : new Date(), rotate : {sec :new Date().getSeconds()*6+"deg", min : new Date().getMinutes()*6+"deg", hour : new Date().getHours()*30+"deg"}});
        }, 1000);
    
        return () => {
        clearInterval(clockRef.current);
        };
    }, []);
    
    useEffect(()=>{
        function alarmChecker(m,n){
            // if(alarmTime.alarms.actual.length !== 0){
            //     alarmTime.alarms.actual.forEach((alarm) => {
            //         if(alarm.time.hour === new Date().getHours()%12 && alarm.time.min === new Date().getMinutes() && alarm.time.seconds === new Date().getSeconds()){
            //             alert("Alarm");
            //         }
            //     })
            // }
            const istAlarm = alarmTime.alarms.actual.find( alarm => alarm.id === m);
            const secAlarm = alarmTime.alarms.actual.find( alarm => alarm.id === n);
            if()
            // if(istAlarm.time.hour)
        }
        function indexSorter(){
            const arr = [...alarmTime.alarms.index];
            let m,n;
            for (let i = 0; i < arr.length-1; i++){
                m=arr[i];
                n=arr[i+1];
                alarmChecker(m,n)
            }
        }   
        alarmRef.current = setInterval(alarmChecker, 1000);
        setAlarm({...alarmTime, alarms: {...alarmTime.alarms, index : [...alarmTime.alarms.index]}, time : {hour : new Date().getHours()%12, min : new Date().getMinutes(), seconds : 0, half : "A.M."}});   
        return () => {
            clearInterval(alarmRef.current);
        }
    },[alarmTime.alarms.actual])

    function handleUpClicks(obj){
        switch (obj.time){
            case "hour" :
                setAlarm({...alarmTime, time : {...alarmTime.time, hour : alarmTime.time.hour > 0 ? alarmTime.time.hour-1 : 11}})
            break;
            case "min" :
                setAlarm({...alarmTime, time : {...alarmTime.time, min : alarmTime.time.min > 0 ? alarmTime.time.min-1 : 59}});
            break;
            case "half" :
                setAlarm({...alarmTime, time : {...alarmTime.time, half : alarmTime.time.half === "A.M." ? "P.M." : "A.M."}});
            break;
        }
    }

    function handleDownClicks(obj){
        switch (obj.time){
            case "hour" :
                setAlarm({...alarmTime, time : {...alarmTime.time, hour : alarmTime.time.hour < 11 ? alarmTime.time.hour+1 : 0}})
            break;
            case "min" :
                setAlarm({...alarmTime, time : {...alarmTime.time, min : alarmTime.time.min <59 ? alarmTime.time.min+1 : 0}});
            break;
            case "half" :
                setAlarm({...alarmTime, time : {...alarmTime.time, half : alarmTime.time.half === "A.M." ? "P.M." : "A.M."}});
            break;
        }
    }

    function idGenerator(notes){ // NOTE'S ID GENERATOR
        const arr = [...notes];
        const result = arr.length !== 0 ? arr[arr.length -1].id + 1 : 1
        return result;
    }

    function handleAlarmSetting(){
        const id = idGenerator(alarmTime.alarms.actual);
        console.log(alarmTime.alarms.actual);
        setAlarm({...alarmTime, ask : true, alarms : {index : [...alarmTime.alarms.index, id], actual : [...alarmTime.alarms.actual,  {id : id, time : alarmTime.time}]}});
    }
    return (
        <>
        <Div id={styles.clock}>
            <Div id={styles.clock_holder}>
                <Div id={styles.circle}>
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
                        <Button cn={styles.up_arr} clickHandler={()=>handleUpClicks({time : "hour"})}>&#9650;</Button> {/* Increaing Hour */}
                            <Para>{alarmTime.time.hour}</Para> {/* Current Hour Value */}
                        <Button cn={styles.down_arr} clickHandler={()=> handleDownClicks({time : "hour"})}>&#9660;</Button> {/* Decreasing Hour */}
                    </Div>
                    <Div cn={styles.alarm_holder}> {/* Alarm Holder for Minute */}
                        <Button cn={styles.up_arr} clickHandler={()=> handleUpClicks({time : "min"})}>&#9650;</Button> {/* Increasing Minute */}
                            <Para>{alarmTime.time.min}</Para> {/* Current Minute Value */}
                        <Button cn={styles.down_arr} clickHandler={()=> handleDownClicks({time : "min"})}>&#9660;</Button> {/* Decreasing Minute */}
                    </Div>
                    <Div cn={styles.alarm_holder}> {/* Alarm Holder for Minute */}
                        <Button cn={styles.up_arr} clickHandler={()=> handleUpClicks({time : "half"})}>&#9650;</Button> {/* Increasing Minute */}
                            <Para>{alarmTime.time.half}</Para> {/* Current Minute Value */}
                        <Button cn={styles.down_arr} clickHandler={()=> handleDownClicks({time : "half"})}>&#9660;</Button> {/* Decreasing Minute */}
                    </Div>
                </Div>
                <Div id={styles.alarm_set_button} cn={alarmTime.ask ? styles.hide : ''}>
                    {(!alarmTime.ask) ? (<><Button id={styles.alarm_set} clickHandler={handleAlarmSetting}>{"Set"}</Button>
                        <Button id={styles.alarm_cancel} clickHandler={()=> setAlarm({...alarmTime, ask : true})}>{"Cancel"}</Button></>) : null
                    }
                </Div>
            </Div>
            <Div id={styles.alarm_list}>
                {alarmTime.alarms.actual.map((alarm) => {
                    return <Para key={alarm.id} cn={styles.settedAlarms}>{`${alarm.time.hour}:${alarm.time.min}`}</Para>
                })}
            </Div>
        </Div>
        </>
    );
    }