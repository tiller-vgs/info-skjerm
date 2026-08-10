import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClassEvent } from "../types/calendar";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";
const CALENDAR_QUERY_KEY = ["calendar-events"];

const mapEventToClient = (event: Record<string, unknown>): ClassEvent => ({
  id: Number(event.id),
  title: String(event.title ?? ""),
  start: new Date(String(event.start)),
  end: new Date(String(event.end)),
  groupId: String(event.groupId) as ClassEvent["groupId"],
  resourceId: String(event.resourceId) as ClassEvent["resourceId"],
  allDay: Boolean(event.allDay),
  desc: event.desc == null ? undefined : String(event.desc),
});

export type CreateCalendarEventInput = Omit<ClassEvent, "id"> & {
  recurrenceUntil?: string;
};

export function useCalendarEvents() {
  return useQuery({
    queryKey: CALENDAR_QUERY_KEY,
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/api/calendar`);
      if (!response.ok) {
        throw new Error("Failed to load calendar events");
      }

      const data = (await response.json()) as Array<Record<string, unknown>>;
      return data.map(mapEventToClient);
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateCalendarEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (event: CreateCalendarEventInput) => {
      const response = await fetch(`${API_BASE}/api/calendar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error("Failed to create calendar event");
      }

      const result = (await response.json()) as
        | Array<Record<string, unknown>>
        | Record<string, unknown>;
      const createdEvents = Array.isArray(result) ? result : [result];
      return createdEvents.map(mapEventToClient);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CALENDAR_QUERY_KEY });
    },
  });
}

export function useUpdateCalendarEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (event: ClassEvent) => {
      const response = await fetch(`${API_BASE}/api/calendar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error("Failed to update calendar event");
      }

      return mapEventToClient(await response.json());
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CALENDAR_QUERY_KEY });
    },
  });
}

export function useDeleteCalendarEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`${API_BASE}/api/calendar`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete calendar event");
      }

      return (await response.json()) as { id: number };
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CALENDAR_QUERY_KEY });
    },
  });
}
