import {
  Calendar,
  luxonLocalizer,
  Views,
  type SlotInfo,
  type View,
} from "react-big-calendar";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DateTime, Settings } from "luxon";
import { useCallback, useEffect, useState } from "react";
import {
  CALENDAR_RESOURCES,
  DEFAULT_GROUP,
  GROUP_COLORS,
  isSchoolGroup,
  type CalendarResource,
  type ClassEvent,
} from "../types/calendar";
import {
  type CreateCalendarEventInput,
  useCalendarEvents,
  useCreateCalendarEvent,
  useDeleteCalendarEvent,
  useUpdateCalendarEvent,
} from "../hooks/useCalendarEvents";
import dragAndDropModule from "react-big-calendar/lib/addons/dragAndDrop";
import type { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

Settings.defaultZone = "Europe/Oslo";

type SlotDraft = {
  start: Date;
  end: Date;
  groupId: ClassEvent["groupId"];
};

const withDragAndDrop =
  ((dragAndDropModule as { default?: unknown }).default ??
    dragAndDropModule) as typeof import("react-big-calendar/lib/addons/dragAndDrop").default;

function CalendarForm() {
  const { data: events = [] } = useCalendarEvents();
  const createEventMutation = useCreateCalendarEvent();
  const updateEventMutation = useUpdateCalendarEvent();
  const deleteEventMutation = useDeleteCalendarEvent();
  const [localEvents, setLocalEvents] = useState<ClassEvent[]>([]);
  const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [slotDraft, setSlotDraft] = useState<SlotDraft | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<ClassEvent | null>(null);
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [groupInput, setGroupInput] =
    useState<ClassEvent["groupId"]>(DEFAULT_GROUP);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceUntil, setRecurrenceUntil] = useState("");

  const [view, setView] = useState<View>(Views.DAY);
  const [date, setDate] = useState(DateTime.local().toJSDate());
  useEffect(() => {
    setLocalEvents(events);
  }, [events]);

  const onNavigate = useCallback(
    (newDate: Date) => setDate(newDate),
    [setDate],
  );
  const onView = useCallback((newView: View) => setView(newView), [setView]);

  const DnDCalendar = withDragAndDrop<ClassEvent, CalendarResource>(Calendar);

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
      const groupId = isSchoolGroup(resourceId) ? resourceId : DEFAULT_GROUP;

      setSlotDraft({ start, end, groupId });
      setTitleInput("");
      setDescInput("");
      setGroupInput(groupId);
      setIsRecurring(false);
      setRecurrenceUntil("");
      setCreateDialogOpen(true);
    },
    [],
  );

  const handleSelectEvent = useCallback((event: ClassEvent) => {
    setSelectedEvent(event);
    setTitleInput(event.title);
    setDescInput(event.desc ?? "");
    setGroupInput(event.groupId);
    setEditDialogOpen(true);
  }, []);

  const closeCreateDialog = () => {
    setCreateDialogOpen(false);
    setSlotDraft(null);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleCreateEvent = () => {
    if (!slotDraft) {
      return;
    }

    const trimmedTitle = titleInput.trim();
    if (!trimmedTitle) {
      return;
    }

    const payload: CreateCalendarEventInput = {
      title: trimmedTitle,
      start: slotDraft.start,
      end: slotDraft.end,
      groupId: groupInput,
      resourceId: groupInput,
      desc: descInput.trim() ? descInput.trim() : undefined,
    };

    if (isRecurring && recurrenceUntil) {
      payload.recurrenceUntil = recurrenceUntil;
    }

    createEventMutation.mutate(payload, {
      onSuccess: (createdEvents) => {
        setLocalEvents((prev) => [...prev, ...createdEvents]);
        closeCreateDialog();
      },
    });
  };

  const handleUpdateEvent = () => {
    if (!selectedEvent) {
      return;
    }

    const trimmedTitle = titleInput.trim();
    if (!trimmedTitle) {
      return;
    }

    updateEventMutation.mutate(
      {
        ...selectedEvent,
        title: trimmedTitle,
        desc: descInput.trim() ? descInput.trim() : undefined,
        groupId: groupInput,
        resourceId: groupInput,
      },
      {
        onSuccess: (updatedEvent) => {
          setLocalEvents((prev) =>
            prev.map((currentEvent) =>
              currentEvent.id === updatedEvent.id ? updatedEvent : currentEvent,
            ),
          );
          closeEditDialog();
        },
      },
    );
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent) {
      return;
    }

    deleteEventMutation.mutate(selectedEvent.id, {
      onSuccess: () => {
        setLocalEvents((prev) =>
          prev.filter(({ id }) => id !== selectedEvent.id),
        );
        closeEditDialog();
      },
    });
  };

  const handleEventTimeChange = useCallback(
    ({ event, start, end, resourceId }: EventInteractionArgs<ClassEvent>) => {
      const updatedGroupId = isSchoolGroup(resourceId)
        ? resourceId
        : event.groupId;
      const updatedEvent: ClassEvent = {
        ...event,
        start: new Date(start),
        end: new Date(end),
        groupId: updatedGroupId,
        resourceId: updatedGroupId,
      };

      setLocalEvents((prev) =>
        prev.map((currentEvent) =>
          currentEvent.id === updatedEvent.id ? updatedEvent : currentEvent,
        ),
      );

      updateEventMutation.mutate(updatedEvent, {
        onSuccess: (savedEvent) => {
          setLocalEvents((prev) =>
            prev.map((currentEvent) =>
              currentEvent.id === savedEvent.id ? savedEvent : currentEvent,
            ),
          );
        },
        onError: () => {
          setLocalEvents((prev) =>
            prev.map((currentEvent) =>
              currentEvent.id === event.id ? event : currentEvent,
            ),
          );
        },
      });
    },
    [updateEventMutation],
  );

  return (
    <>
      <DnDCalendar
        dayLayoutAlgorithm="no-overlap"
        resizable
        className="tq-rbc-theme mt-20 p-5"
        resources={resources}
        resourceAccessor="resourceId"
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
        events={localEvents}
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
        onEventDrop={handleEventTimeChange}
        onEventResize={handleEventTimeChange}
      />

      <Dialog
        open={createDialogOpen}
        onClose={closeCreateDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Lag ny hendelse</DialogTitle>
        <DialogContent>
          <div className="mt-2 flex flex-col gap-4">
            <TextField
              label="Tittel"
              value={titleInput}
              onChange={(event) => setTitleInput(event.target.value)}
              autoFocus
              fullWidth
            />
            <TextField
              label="Beskrivelse (ikke nødvendig)"
              value={descInput}
              onChange={(event) => setDescInput(event.target.value)}
              fullWidth
              multiline
              minRows={2}
            />
            <FormControl fullWidth>
              <InputLabel id="calendar-create-group-label">Gruppe</InputLabel>
              <Select
                labelId="calendar-create-group-label"
                value={groupInput}
                label="Gruppe"
                onChange={(event) =>
                  setGroupInput(event.target.value as ClassEvent["groupId"])
                }
              >
                {resources.map((resource) => (
                  <MenuItem
                    key={resource.resourceId}
                    value={resource.resourceId}
                  >
                    {resource.resourceTitle}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isRecurring}
                  onChange={(event) => setIsRecurring(event.target.checked)}
                />
              }
              label="Repeter ukentlig"
            />
            {isRecurring ? (
              <TextField
                label="Repeter til"
                type="date"
                value={recurrenceUntil}
                onChange={(event) => setRecurrenceUntil(event.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                fullWidth
              />
            ) : null}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCreateDialog}>Avbryt</Button>
          <Button onClick={handleCreateEvent} variant="contained">
            Lagre
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editDialogOpen}
        onClose={closeEditDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Rediger hendelse</DialogTitle>
        <DialogContent>
          <div className="mt-2 flex flex-col gap-4">
            <TextField
              label="Tittel"
              value={titleInput}
              onChange={(event) => setTitleInput(event.target.value)}
              autoFocus
              fullWidth
            />
            <TextField
              label="Beskrivelse (ikke nødvendig)"
              value={descInput}
              onChange={(event) => setDescInput(event.target.value)}
              fullWidth
              multiline
              minRows={2}
            />
            <FormControl fullWidth>
              <InputLabel id="calendar-edit-group-label">Gruppe</InputLabel>
              <Select
                labelId="calendar-edit-group-label"
                value={groupInput}
                label="Gruppe"
                onChange={(event) =>
                  setGroupInput(event.target.value as ClassEvent["groupId"])
                }
              >
                {resources.map((resource) => (
                  <MenuItem
                    key={resource.resourceId}
                    value={resource.resourceId}
                  >
                    {resource.resourceTitle}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleDeleteEvent}>
            Slett
          </Button>
          <Button onClick={closeEditDialog}>Cancel</Button>
          <Button onClick={handleUpdateEvent} variant="contained">
            Lagre
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CalendarForm;
