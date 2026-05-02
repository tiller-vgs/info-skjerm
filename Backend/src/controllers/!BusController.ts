const router = Router();
router.get("/departures", async (req: Request, res: Response) => {
    const num = Number(req.query.num) || 20;
    
    var query =
    '{"query": "{ stopPlace( id: \"NSR:StopPlace:44029\" ) { id name estimatedCalls( numberOfDepartures: ' +
    num.toString() +
    ' ) { realtime aimedArrivalTime expectedArrivalTime destinationDisplay { frontText } quay { id } serviceJourney { journeyPattern { line { id name transportMode } } } } }}"}';

  const options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: query,
  };

    try {
        const response = await fetchWithRetry(
            "https://api.entur.io/journey-planner/v3/graphql",
            options,
        );
    }
});

'{"query": "{ stopPlace( id: \"NSR:StopPlace:44029\" ) { id name estimatedCalls( numberOfDepartures: 10 ) { realtime aimedArrivalTime expectedArrivalTime destinationDisplay { frontText } quay { id } serviceJourney { journeyPattern { line { id name transportMode } } } } }}"}'


