import { TodaysEventsData } from "@/types";
import React, { useEffect, useState, useTransition } from "react";
import EventComponent from "./EventComponent";
import { weatherDataDays } from "@/data";

export default function Info() {
  const [todaysEventsData, setTodaysEventsData] =
    useState<TodaysEventsData[]>();
  const [isPending, startTransition] = useTransition();
  const [firstRender, setFirstRender] = useState(true);

  const fetchTodaysevents = () => {
    startTransition(async () => {
      await fetch("http://localhost:5237/GetEvents/todaysevents")
        .then((response) => response.json())
        .then((data) => {setTodaysEventsData(data)})
        // .then((data) => console.log(data[0].title))
        .catch((error) => console.error("Error:", error));
    });
    // if (todaysEventsData != undefined){
    // setTodaysEventsData(todaysEventsData.sort((a, b) =>{
    //   if (a.starttime < b.starttime){
    //     return -1
    //   }
    //   if (a.starttime > b.starttime){
    //     return 1
    //   }
    //   else{return 0}
    // } ))}
  };
  console.log(todaysEventsData)

  // todaysEventsData?.concat( {"id": 1, "title": "meow", "body": "meow", "starttime": undefined, "endtime": undefined });

  useEffect(() => {
    if (firstRender) {
      fetchTodaysevents();
      setFirstRender(false);
    }
    setInterval(() => {
      if (new Date().getHours() === 12) {
        fetchTodaysevents();
        
      }
    }, 1000 * 60 * 60);
  }, []);

  return (
    <div className="">
      {
        
        (todaysEventsData == undefined) ? (<p>Loading</p>):(
          (todaysEventsData.sort((a, b) =>{
            if (a.starttime < b.starttime){
              return -1
            }
            if (a.starttime > b.starttime){
              return 1
            }
            else{return 0}
          } )).map((x) =>{
            return(
              <div className="border-2 border-slate-500 rounded-lg overflow-hidden mb-2">
                <EventComponent title={x.title} body={x.body} starttime={x.starttime}  endtime={x.endtime} />
              </div>
            )
          })
        )
      }
      {/* <div className="border-2 border-slate-500 rounded-lg overflow-hidden">
        <EventComponent title="test" body="test" />
      </div> */}
    </div>
  );
}
