namespace info_skjerm_api.Model

{
    public struct BusRoute
    {
        public int busLine { get; set; }
        public string destination { get; set; }
        public DateTime time { get; set; }
        public bool isRealTime { get; set; }
    }
    public class BusStop
    {
        public List<BusRoute> northBound { get; set; } = [];
        public List<BusRoute> southBound { get; set; } = [];
        public List<BusRoute> all { get; set; } = [];
    }
}