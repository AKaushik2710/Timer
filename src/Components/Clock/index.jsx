import { useEffect, useState } from "react";
import Div from "../Div";
import Para from "../Para";
import styles from "./index.module.css";

export default function Clock() {
    const [time, setTime] = useState( {tm : new Date(), rot : new Date().getSeconds()*6+"deg"});
    // const sec = time.getSeconds()*6;
    useEffect(() => {
        const interval = setInterval(() => {
        setTime({tm : new Date(), rot : new Date().getSeconds()*6+"deg"});
        }, 1000);
    
        return () => {
        clearInterval(interval);
        };
    }, []);
    
    return (
        <>
        <Div id={styles.circle}>
            <img src="../../assets/clock.png" width="50px" height="50px"></img>
            {/* <Para id={styles.arr}>&rarr;</Para> */}
            <p id={styles.arr} style={{rotate : time.rot}}>&rarr;</p>
        </Div>
        <Div>
            <Para id={styles.time}>{time.tm.toLocaleTimeString()}</Para>

        </Div>
        </>
    );
    }