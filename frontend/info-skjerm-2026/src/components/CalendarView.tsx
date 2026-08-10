import { Calendar, luxonLocalizer } from "react-big-calendar";
import { DateTime, Settings } from "luxon";
import {
  CALENDAR_RESOURCES,
  GROUP_COLORS,
  type CalendarResource,
  type ClassEvent,
} from "../types/calendar";

Settings.defaultZone = "Europe/Oslo";

function CalendarView() {
  const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });

  const events: ClassEvent[] = [
    {
      id: 14,
      title: "Today",
      start: new Date(new Date().setHours(new Date().getHours() - 13)),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
      groupId: "1IM1/2",
      resourceId: "1IM1/2",
    },
    {
      id: 140,
      title: "Today",
      start: new Date(new Date().setHours(new Date().getHours() - 11)),
      end: new Date(new Date().setHours(new Date().getHours() + 3)),
      groupId: "1IM3/4",
      resourceId: "1IM3/4",
    },
    {
      id: 141,
      title: "Today",
      start: new Date(new Date().setHours(new Date().getHours() - 20)),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
      groupId: "2MP1",
      resourceId: "2MP1",
    },
    {
      id: 142,
      title: "Today",
      start: new Date(new Date().setHours(new Date().getHours() - 10)),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
      groupId: "2IT1/2",
      resourceId: "2IT1/2",
    },
  ];

  const eventPropGetter = (event: ClassEvent) => {
    const c = GROUP_COLORS[event.groupId];
    return {
      style: {
        backgroundColor: c.bg,
        borderColor: c.border,
        color: c.text,
      },
      className: "school-event",
    };
  };

  const resources: CalendarResource[] = CALENDAR_RESOURCES;

  const minTime = DateTime.local()
    .set({ hour: 8, minute: 0, second: 0, millisecond: 0 })
    .toJSDate();
  const maxTime = DateTime.local()
    .set({ hour: 16, minute: 0, second: 0, millisecond: 0 })
    .toJSDate();

  return (
    <Calendar<ClassEvent, CalendarResource>
      className="tq-rbc-theme"
      dayLayoutAlgorithm="no-overlap"
      resources={resources}
      resourceAccessor="resourceId"
      resourceIdAccessor="resourceId"
      resourceTitleAccessor="resourceTitle"
      events={events}
      eventPropGetter={eventPropGetter}
      toolbar={false}
      culture="nb-NO"
      views={["day"]}
      localizer={localizer}
      defaultView="day"
      enableAutoScroll
      scrollToTime={DateTime.local().toJSDate()}
      min={minTime}
      max={maxTime}
      startAccessor="start"
      endAccessor="end"
    />
  );
}

export default CalendarView;
