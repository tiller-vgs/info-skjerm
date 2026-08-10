import { Calendar, luxonLocalizer } from "react-big-calendar";
import { DateTime, Settings } from "luxon";
import {
  CALENDAR_RESOURCES,
  GROUP_COLORS,
  type CalendarResource,
  type ClassEvent,
} from "../types/calendar";
import { useCalendarEvents } from "../hooks/useCalendarEvents";

Settings.defaultZone = "Europe/Oslo";

function CalendarView() {
  const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });
  const { data: events = [] } = useCalendarEvents();

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
