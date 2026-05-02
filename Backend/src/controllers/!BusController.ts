// need to discuss what the frontend will resive and what format

import { Router, Request, Response } from "express";
import {BusStop, BusRoute, Businfo} from "@models";
import {MakefetchWithRetry} from "@helpers";

const fetchWithRetry = MakefetchWithRetry("BusTimesController");
const router = Router();


router.get("/departures", async (req: Request, res: Response) => {
  const num = Number(req.query.num) || 20;

  var query = '{"query": "{ stopPlace( id: \"NSR:StopPlace:44029\" ) { id name estimatedCalls( numberOfDepartures: ' + num.toString() + ' ) { realtime aimedArrivalTime expectedArrivalTime destinationDisplay { frontText } quay { id } serviceJourney { journeyPattern { line { id name transportMode } } } } }}"}';

  const options: RequestInit = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: query,
  };

  try {
    const response = await fetchWithRetry("https://api.entur.io/journey-planner/v3/graphql", options);
    const json = (await response.json()) as Businfo;

    const northBound: BusRoute[] = [];
    const southBound: BusRoute[] = [];
    const all: BusRoute[] = [];

    const calls = json.data.stopPlace.estimatedCalls;
    console.log("All calls:  -- ", calls);

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

      all.push(route);

      // idk FIX
      if (call.quay.id === "NSR:Quay:75606") {
        northBound.push(route);
      } else if (call.quay.id === "NSR:Quay:75607") {
        southBound.push(route);
      }
    }

    const busStop: BusStop = {
      northBound,
      southBound,
      all,
    };

    return res.json(busStop);
  } catch (err) {
    console.error("Bus API failed", err);
    return res.status(503).send("Bus service unavailable");
  }
});

// '{"query": "{ stopPlace( id: \"NSR:StopPlace:44029\" ) { id name estimatedCalls( numberOfDepartures: 10 ) { realtime aimedArrivalTime expectedArrivalTime destinationDisplay { frontText } quay { id } serviceJourney { journeyPattern { line { id name transportMode } } } } }}"}'
export default router;