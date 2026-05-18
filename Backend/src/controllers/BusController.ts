// need to discuss what the frontend will resive and what format

import { Router, Request, Response } from "express";
import {BusStop, BusRoute, Businfo} from "@models";
import { MakefetchWithRetry, print } from "@helpers";

const fetchWithRetry = MakefetchWithRetry("BusTimesController");
const router = Router();


router.get("/", async (req: Request, res: Response) => {
  print("req.query", req.query, req.query.BusStop);
	const num = Number(req.query.num) * 2 || 20;
	// const num = 20;
	const BusStop = (req.query.BusStop as string);
	// const BusStop = "Tiller VGS.";
	// const BusStop = "Tillerterminalen";
	// const BusStop = "city syd";
	// const BusStopNumber = Number(BusStop) || 44029;

	// print("test:   ", BusStop, BusStop.replace(" ", "%20"));
	const response = await fetchWithRetry(`https://api.entur.io/geocoder/v1/autocomplete?text=${(BusStop + ", Trondheim").replace(" ", "%20")}`); // autocomplete, search
	const BussID = await response.json();
	print("MAIN TEST ___________", (BusStop + ", Trondheim").replace(" ", "%20"), BussID, BussID.features[0].properties);
	print(BussID.features[0].properties.id, `stopPlace( id: \"${BussID.features[0].properties.id}\" )`)

	// city syd nord = 75612 sør = 75611
//   var query = `
//     {
//       stopPlace( id: \"${BussID.features[0].properties.id}\" ) {
//         id
//         name
//         estimatedCalls( numberOfDepartures: ` + num.toString() + ` ) {
//           realtime
//           aimedArrivalTime
//           expectedArrivalTime
//           destinationDisplay {
//             frontText
//           }
//           quay {
//             id
//           }
//           serviceJourney {
//             journeyPattern {
//               line {
//                 id
//                 name
//                 transportMode
//               }
//             }
//           }
//         }
//       }
//     }     
//   `;
  var query = `
    {
		stopPlace( id: "${BussID.features[0].properties.id}" ) {
			id
			name
			estimatedCalls( numberOfDepartures: 30 ) {
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
  	`;// line.direction
  print("query", query);

	const options: RequestInit = {
		method: "POST",
		headers: { "Content-Type": "application/json", "ET-Client-Name": "your-app-name" },
		body: JSON.stringify({ query }), // query
	};

	try {
		const response = await fetchWithRetry("https://api.entur.io/journey-planner/v3/graphql", options);
		const json = (await response.json()) as Businfo;
		print("PRINT json _________", json);
		print(json.data.stopPlace.name, json.data.stopPlace.id)

		const northBound: BusRoute[] = [];
		const southBound: BusRoute[] = [];
		const all: BusRoute[] = [];

		const calls = json.data.stopPlace.estimatedCalls;
		const LowestQuay = Math.min(...calls.map((call) => Number(call.quay.id.slice(9, call.quay.id.length))))
		print(LowestQuay)
		// console.log("All calls:  -- ", calls);

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

			// all.push(route);

			// idk FIX
			// if (call.serviceJourney.journeyPattern.line.direction === 1) {
			if (call.quay.id === "NSR:Quay:" + LowestQuay.toString()) {
				northBound.push(route);
			// } else if (call.serviceJourney.journeyPattern.line.direction === 2) {
			} else if (Number(call.quay.id.slice(9, call.quay.id.length)) >= LowestQuay) {
				southBound.push(route);
			}
		}

		const busStop: BusStop = {
			northBound,
			southBound,
			// all,
		};

		// console.log("res:  -- ", busStop);
		return res.json([busStop, BussID, query, `https://api.entur.io/geocoder/v1/search?text=${(BusStop + ", Trondheim").replace(" ", "%20")}`]);
	} catch (err) {
		console.error("Bus API failed", err);
		return res.status(503).send("Bus service unavailable");
	}
});


// '{"query": "{ stopPlace( id: \"NSR:StopPlace:44029\" ) { id name estimatedCalls( numberOfDepartures: 10 ) { realtime aimedArrivalTime expectedArrivalTime destinationDisplay { frontText } quay { id } serviceJourney { journeyPattern { line { id name transportMode } } } } }}"}'
export default router;