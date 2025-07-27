export type LoginValue = {
  email: string;
  password: string;
};

export type RegisterValue = {
  name: string;
  email: string;
  password: string;
};

export type UpdateProfileValue = {
  expires: string | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  id?: string | null | undefined;
};

export interface WeatherDataItem {
  time: string;
  airTemperature: number;
  symbol_code: string;
}

export type WeatherData = WeatherDataItem[];

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
  id: number;
  title: string;
  body: string;
  starttime: Date | string;
  endtime: Date | string | undefined;
};
export type LeaderboardData = {
  users: {
    id: string;
    xp: number;
    title: string;
    titleRarity: string;
    name: string;
    image: string;
    level: number;
    class: string;
    guildName: string;
    schoolClass: string;
  }[];
};
