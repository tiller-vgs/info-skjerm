export type LoginValue = {
  email: string;
  password: string;
};

export type RegisterValue = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UpdateProfileValue = {
  expires: string | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  id?: string | null | undefined;
};

export type weatherData = {
  time: string;
  airTemperature: number;
  symbol_code: string;
};

export type BusItem = {
  busLine: number;
  destination: string;
  time: string;
  isRealTime: boolean;
};

export type busDataValues = {
  all: BusItem[];
  northBound: BusItem[];
  southBound: BusItem[];
};

export type EventsValues = {
  title: string;
  body: string;
  starttime: Date | string | null;
  endtime: Date | string | null;
};
