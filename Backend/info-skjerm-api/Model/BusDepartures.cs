namespace info_skjerm_api.Model

{
    public struct Businfo
    {
        public DataBus data { get; set; }
    }

    public struct DataBus
    {
        public StopPlace stopPlace{ get; set; }
    }

    public struct StopPlace
    {
       public string id { get; set; }
       public string name { get; set; }
       public List<EstimatedCalls> estimatedCalls{ get; set; }
    }

    public struct EstimatedCalls
    {
        public bool realtime { get; set; }
        public DateTime aimedArrivalTime { get; set; }
        public DateTime expectedArrivalTime { get; set; } 
        public DestinationDisplay destinationDisplay { get; set; }
        public Quay quay{ get; set; }
        public ServiceJourney serviceJourney{ get; set; }
    }

    public struct DestinationDisplay
    {
        public string frontText { get; set; }
    }
    public struct Quay 
    {
        public string id { get; set; }
    }
    public struct ServiceJourney 
    {
        public JourneyPattern journeyPattern { get; set; }
    }
    public struct JourneyPattern 
    {
        public Line line{ get; set; }
    }
    public struct Line
    {
        public string id { get; set;}
        public string name { get; set;}
        public string transportMode { get; set; }
    }
}