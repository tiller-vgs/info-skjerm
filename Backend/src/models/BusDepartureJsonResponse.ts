export interface BusRoute {
  busLine: number;
  destination: string;
  time: string;
  isRealTime: boolean;
}

export interface BusStop {
  northBound: BusRoute[];
  southBound: BusRoute[];
  // all: BusRoute[];
}
