import { Calendar, luxonLocalizer, Views, type View } from "react-big-calendar";
import { DateTime, Settings } from "luxon";
import { useCallback, useState } from "react";

Settings.defaultZone = "Europe/Oslo";

function CalendarWrapper() {
  const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });

  type SchoolGroup = "1IM1/2" | "1IM3/4" | "2IT1/2" | "2MP1";

  type CalendarResource = {
    resourceId: SchoolGroup;
    resourceTitle: string;
  };

  type ClassEvent = {
    id: number;
    title: string;
    start: Date;
    end: Date;
    groupId: SchoolGroup;
    resourceId: SchoolGroup;
    allDay?: boolean;
    desc?: string;
  };

  const [view, setView] = useState<View>(Views.DAY);
  const [date, setDate] = useState(DateTime.local().toJSDate());
  const onNavigate = useCallback(
    (newDate: Date) => setDate(newDate),
    [setDate],
  );
  const onView = useCallback((newView: View) => setView(newView), [setView]);

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

  const GROUP_COLORS: Record<
    SchoolGroup,
    { bg: string; border: string; text: string }
  > = {
    "1IM1/2": { bg: "#0ea5e9", border: "#0284c7", text: "#ffffff" },
    "1IM3/4": { bg: "#22c55e", border: "#15803d", text: "#ffffff" },
    "2IT1/2": { bg: "#f59e0b", border: "#b45309", text: "#111827" },
    "2MP1": { bg: "#ef4444", border: "#b91c1c", text: "#ffffff" },
  };

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

  const resources: CalendarResource[] = [
    { resourceId: "1IM1/2", resourceTitle: "1IM1/2" },
    { resourceId: "1IM3/4", resourceTitle: "1IM3/4" },
    { resourceId: "2IT1/2", resourceTitle: "2IT1/2" },
    { resourceId: "2MP1", resourceTitle: "2MP1" },
  ];

  const minTime = DateTime.local()
    .set({ hour: 8, minute: 0, second: 0, millisecond: 0 })
    .toJSDate();
  const maxTime = DateTime.local()
    .set({ hour: 16, minute: 0, second: 0, millisecond: 0 })
    .toJSDate();

  return (
    <Calendar<ClassEvent, CalendarResource>
      className="tq-rbc-theme"
      resources={resources}
      resourceAccessor="resourceId"
      resourceIdAccessor="resourceId"
      resourceTitleAccessor="resourceTitle"
      events={events}
      eventPropGetter={eventPropGetter}
      //   timeslots={4}
      toolbar={false}
      //   step={15}
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
    />
  );
}

export default CalendarWrapper;
