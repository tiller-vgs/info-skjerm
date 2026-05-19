export interface BusRouteType {
  busLine: number;
  destination: string;
  time: string;
  isRealTime: boolean;
}

export interface BusStop {
  northBound: BusRouteType[];
  southBound: BusRouteType[];
}
