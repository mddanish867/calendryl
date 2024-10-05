"use client"
import { Calendar } from "./Calender";
import { getLocalTimeZone, today } from "@internationalized/date";


export function RenderCalendar(){
    return(
        <Calendar minValue={today(getLocalTimeZone())}/>
    )
}