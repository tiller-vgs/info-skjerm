export interface CalendarEventType {
  id?: number;
  title: string;
  start: string | Date;
  end: string | Date;
  recurrenceUntil?: string | Date | null;
  groupId: string;
  resourceId: string;
  allDay?: boolean;
  desc?: string | null;
}
