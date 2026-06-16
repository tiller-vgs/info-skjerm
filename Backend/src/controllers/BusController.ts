import { Router, Request, Response } from "express";
import { BusStop, BusRoute, Businfo } from "@models";
import { MakefetchWithRetry } from "@helpers";

const fetchWithRetry = MakefetchWithRetry("BusTimesController");
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  // Set varibles based on the url used to reach this router
  const NumberOfCalls = Number(req.query.num) || 50; // FIX ask to change the querry.num name
  const BusStop = req.query.BusStop as string;

  // Uses the BusStop name and gives us the id that we then use on the other BusAPI
  const response = await fetchWithRetry(
    `https://api.entur.io/geocoder/v1/autocomplete?text=${(BusStop + ", Trondheim").replace(" ", "%20")}`,
  ); // Change between these if something goes wrong:   autocomplete, search
  const BussID = await response.json();

  // How the BusAPI knows what to send back
  var query = `
    {
      stopPlace( id: "${BussID.features[0].properties.id}" ) {
        id
        name
        estimatedCalls( numberOfDepartures: ${NumberOfCalls} ) {
          realtime
          aimedArrivalTime
          expectedArrivalTime
          destinationDisplay {
            frontText
          }
          quay {
            id
          }
          serviceJourney {
            journeyPattern {
              line {
                id
                name
                transportMode
                publicCode
              }
            }
          }
        }
      }
	  }
  `;

  // Setup Extra info to the BusAPI
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ET-Client-Name": "your-app-name",
    },
    body: JSON.stringify({ query }), // query
  };

  try {
    // Fetches the BusAPI
    const response = await fetchWithRetry(
      "https://api.entur.io/journey-planner/v3/graphql",
      options,
    );
    const json = (await response.json()) as Businfo;

    const northBound: BusRoute[] = [];
    const southBound: BusRoute[] = [];

    const calls = json.data.stopPlace.estimatedCalls;
    const LowestQuay = Math.min(
      ...calls.map((call) => Number(call.quay.id.slice(9))),
    );

    // Each call is one bus taking one route
    for (const call of calls) {
      const id = call.serviceJourney.journeyPattern.line.id;
      const parts = id.split(":")[2]?.split("_")[1];
      const busLine = parts ? parseInt(parts) : NaN;

      const route: BusRoute = {
        destination: call.destinationDisplay.frontText,
        time: call.expectedArrivalTime,
        isRealTime: call.realtime,
        busLine,
      };

      if (call.quay.id === "NSR:Quay:" + LowestQuay.toString()) {
        northBound.push(route);
      } else if (Number(call.quay.id.slice(9)) >= LowestQuay) {
        southBound.push(route);
      }
    }

    const busStop: BusStop = {
      northBound,
      southBound,
    };
    // , BussID, query, `https://api.entur.io/geocoder/v1/search?text=${(BusStop + ", Trondheim").replace(" ", "%20")}`]
    return res.json(busStop);
  } catch (err) {
    console.error("Bus API failed", err);
    return res.status(503).send("Get BusRoutes router unavailable");
  }
});

export default router;
