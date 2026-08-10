export type SchoolGroup = "1IM1/2" | "1IM3/4" | "2IT1/2" | "2MP1";

export type CalendarResource = {
  resourceId: SchoolGroup;
  resourceTitle: string;
};

export type ClassEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  groupId: SchoolGroup;
  resourceId: SchoolGroup;
  allDay?: boolean;
  desc?: string;
};

export const DEFAULT_GROUP: SchoolGroup = "1IM1/2";

export const GROUP_COLORS: Record<
  SchoolGroup,
  { bg: string; border: string; text: string }
> = {
  "1IM1/2": { bg: "#0ea5e9", border: "#0284c7", text: "#ffffff" },
  "1IM3/4": { bg: "#22c55e", border: "#15803d", text: "#ffffff" },
  "2IT1/2": { bg: "#f59e0b", border: "#b45309", text: "#111827" },
  "2MP1": { bg: "#ef4444", border: "#b91c1c", text: "#ffffff" },
};

export const CALENDAR_RESOURCES: CalendarResource[] = [
  { resourceId: "1IM1/2", resourceTitle: "1IM1/2" },
  { resourceId: "1IM3/4", resourceTitle: "1IM3/4" },
  { resourceId: "2IT1/2", resourceTitle: "2IT1/2" },
  { resourceId: "2MP1", resourceTitle: "2MP1" },
];

export const isSchoolGroup = (
  value: string | number | null | undefined,
): value is SchoolGroup => {
  return (
    value === "1IM1/2" ||
    value === "1IM3/4" ||
    value === "2IT1/2" ||
    value === "2MP1"
  );
};
