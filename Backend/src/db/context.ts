import type { EventsType } from "@models";

let eventsTable: EventsType[] = [];
let nextId = 1;

export const context = {
  events: {
    // add an event to the table ()
    create: async (data: EventsType): Promise<EventsType> => {
      const newEvent = { ...data, ID: nextId++ };
      eventsTable.push(newEvent);
      return newEvent;
    },
    // get all events (SELECT * FROM eventTable)
    toList: async () => eventsTable,
    // find an event in table (SELECT * FROM eventTable WHERE ID = ?) (id)
    findById: async (id: number): Promise<EventsType | undefined> => {
      return eventsTable.find((e) => e.ID === id);
    },
    // remove an event from table
    delete: async (id: number): Promise<void> => {
      eventsTable = eventsTable.filter((e) => e.ID !== id);
    },
  },
};