// Representerer én dag med tilhørende værobjekter
export interface WeatherDay {
  day: string;
  WeatherObjects: WeatherObject[];
}

// Representerer én værperiode med værdata
export interface WeatherObject {
  time: string;
  symbol_code: string;
  air_temperature: number;
  wind_speed: number;
  wind_from_direction: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  dateStart: string;
  dateEnd: string;
}

export interface TQLeaderboardUser {
  image: string | null;
  title: string | null;
  titleRarity: string | null;
  name: string | null;
  guildName: string | null;
  username: string | null;
  schoolClass: string | null;
  level: number;
  xp: number;
}

export interface TQLeaderboardYear {
  users: TQLeaderboardUser[] | null;
  title: string;
}
