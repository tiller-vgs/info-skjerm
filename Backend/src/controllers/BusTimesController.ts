/*
This file is for all endpoints for bus routes
For other endpoints, create new controllers
The route for these endpoints are {baseurl}/BusTimes/{endpoint}

Authored by @Marcus-Aastum
*/

import { Router, Request, Response } from "express";
import { BusStop, BusRoute, Businfo } from "@models";
import { fetchWithRetry } from "@helpers";
import NodeCache from "node-cache";

const router = Router();
const cache = new NodeCache();

router.get("/departures", async (req: Request, res: Response) => {
  const num = Number(req.query.num) || 20;
  const cacheKey = `bus_departures_${num}`;

  const cached = cache.get<BusStop>(cacheKey);
  if (cached) {
    console.log(`Returning cached bus departures for ${num}`);
    return res.json(cached);
  }

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
    const response = await fetch( // fetchWithRetry(
      "https://api.entur.io/journey-planner/v3/graphql",
      options,
    );

    const json = (await response.json()) as Businfo;

    const northBound: BusRoute[] = [];
    const southBound: BusRoute[] = [];
    const all: BusRoute[] = [];

    const calls = json.data.stopPlace.estimatedCalls;
    console.log("All calls:  -- ", calls)

    for (const call of calls) {
      const id = call.serviceJourney.journeyPattern.line.id;
      const parts = id.split(":")[2]?.split("_")[1];
      const busLine = parts? parseInt(parts) : NaN;

      const route: BusRoute = {
        destination: call.destinationDisplay.frontText,
        time: call.expectedArrivalTime,
        isRealTime: call.realtime,
        busLine,
      };

      all.push(route);

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

    cache.set(cacheKey, busStop, 60 * 2);

    return res.json(busStop);
  } catch (err) {
    console.error("Bus API failed", err);
    return res.status(503).send("Bus service unavailable");
  }
});

export default router;
