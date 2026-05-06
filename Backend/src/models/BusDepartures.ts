export interface Businfo {
  data: DataBus;
}

export interface DataBus {
  stopPlace: StopPlace;
}

export interface StopPlace {
  id: string;
  name: string;
  estimatedCalls: EstimatedCalls[];
}

export interface EstimatedCalls {
  realtime: boolean;
  aimedArrivalTime: string;
  expectedArrivalTime: string;
  destinationDisplay: DestinationDisplay;
  quay: Quay;
  serviceJourney: ServiceJourney;
}

export interface DestinationDisplay {
  frontText: string;
}

export interface Quay {
  id: string;
}

export interface ServiceJourney {
  journeyPattern: JourneyPattern;
}

export interface JourneyPattern {
  line: Line;
}

export interface Line {
  id: string;
  name: string;
  transportMode: string;
}
