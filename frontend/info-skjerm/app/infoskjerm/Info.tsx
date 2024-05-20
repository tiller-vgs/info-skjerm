import { EventsValues } from "@/types";
import React, { useEffect, useState, useTransition } from "react";
import EventComponent from "./EventComponent";

export default function Info() {
  const [todaysEventsData, setTodaysEventsData] = useState<EventsValues[]>();
  const [isPending, startTransition] = useTransition();
  const [firstRender, setFirstRender] = useState(true);

  const fetchTodaysevents = () => {
    startTransition(async () => {
      await fetch("http://localhost:5237/GetEvents/todaysevents")
        .then((response) => response.json())
        .then((data) => {
          setTodaysEventsData(data);
        })
        .catch((error) => console.error("Error:", error));
    });
  };

  function sortEvents(events: EventsValues[]) {
    events.sort((a, b) => {
      if (a.starttime < b.starttime) {
        return -1;
      }
      if (a.starttime > b.starttime) {
        return 1;
      } else {
        return 0;
      }
    });
    return events;
  }

  useEffect(() => {
    if (firstRender) {
      fetchTodaysevents();
      setFirstRender(false);
    }
    setInterval(() => {
      fetchTodaysevents();
    }, 1000 * 10);
  }, [firstRender]);

  return (
    <div className="">
      {todaysEventsData == undefined ? (
        <p>Loading</p>
      ) : (
        sortEvents(todaysEventsData).map((data) => {
          return (
            <div
              className="border-2 border-slate-500 rounded-lg overflow-hidden mb-2"
              key={data.id}
            >
              <EventComponent
                title={data.title}
                body={data.body}
                key={data.id}
              />
            </div>
          );
        })
      )}
    </div>
  );
}
