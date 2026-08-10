import {
  Calendar,
  luxonLocalizer,
  Views,
  type SlotInfo,
  type View,
} from "react-big-calendar";
import { DateTime, Settings } from "luxon";
import { useCallback, useState } from "react";
import {
  CALENDAR_RESOURCES,
  DEFAULT_GROUP,
  GROUP_COLORS,
  isSchoolGroup,
  type CalendarResource,
  type ClassEvent,
} from "../types/calendar";

Settings.defaultZone = "Europe/Oslo";

const dummyEvents: ClassEvent[] = [
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
function CalendarForm() {
  const [events, setEvents] = useState(dummyEvents);
  const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });

  const [view, setView] = useState<View>(Views.DAY);
  const [date, setDate] = useState(DateTime.local().toJSDate());
  const onNavigate = useCallback(
    (newDate: Date) => setDate(newDate),
    [setDate],
  );
  const onView = useCallback((newView: View) => setView(newView), [setView]);

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

  const handleSelectSlot = useCallback(
    ({ start, end, resourceId }: SlotInfo) => {
      const title = window.prompt("New Event Name");
      if (!title) {
        return;
      }

      const groupId = isSchoolGroup(resourceId) ? resourceId : DEFAULT_GROUP;
      const newEvent: ClassEvent = {
        id: Date.now(),
        title,
        start,
        end,
        groupId,
        resourceId: groupId,
        desc: "Local-only event",
      };

      setEvents((prev) => [...prev, newEvent]);
    },
    [],
  );

  const handleSelectEvent = useCallback(
    (event: ClassEvent) => window.alert(event.title),
    [],
  );

  return (
    <Calendar<ClassEvent, CalendarResource>
      dayLayoutAlgorithm="no-overlap"
      className="tq-rbc-theme mt-20 p-5"
      resources={resources}
      resourceAccessor="resourceId"
      resourceIdAccessor="resourceId"
      resourceTitleAccessor="resourceTitle"
      events={events}
      eventPropGetter={eventPropGetter}
      //   timeslots={4}
      step={5}
      culture="nb-NO"
      date={date}
      onNavigate={onNavigate}
      onView={onView}
      view={view}
      views={["day", "work_week"]}
      localizer={localizer}
      defaultView="day"
      enableAutoScroll
      scrollToTime={DateTime.local().toJSDate()}
      min={minTime}
      max={maxTime}
      startAccessor="start"
      endAccessor="end"
      selectable
      onSelectEvent={handleSelectEvent}
      onSelectSlot={handleSelectSlot}
    />
  );
}

export default CalendarForm;
