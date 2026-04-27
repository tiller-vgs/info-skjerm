import type { EventsType } from "../models/Event.js";

// const events: EventsType[] = [];
let eventsTable: EventsType[] = [];
let nextId = 1;

export const context = {
  // Events: {
  //   toList: async () => events,
  //   findById: async (id: number) => events.find((e) => e.ID === id) || null,
  // },
  events: {
    create: async (data: EventsType): Promise<EventsType> => {
      const newEvent = { ...data, ID: nextId++ };
      eventsTable.push(newEvent);
      return newEvent;
    },
    toList: async () => eventsTable,
    findById: async (id: number): Promise<EventsType | undefined> => {
      return eventsTable.find((e) => e.ID === id);
    },
    delete: async (id: number): Promise<void> => {
      eventsTable = eventsTable.filter((e) => e.ID !== id);
    },
  },
};