// Used for all APIs that don't need authentication

import dotenv from "dotenv";
import express from "express";
import * as controller from "@controllers";
import cors from "cors";
import { auth } from "@lib/auth";
import { toNodeHandler } from "better-auth/node";
dotenv.config({ path: "./.env", override: true, debug: true });


const PORT = process.env.PORT || "3000";
const app = express();
const allowedOrigins = ["http://localhost:5174", "http://localhost:" + PORT];

app.use(
	cors({
		origin: (origin, callback) => { // Only allaw requests from some adresses
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("CORS blocked"));
			}
		},
		methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
	}),
);


// Better Auth handler must be mounted before express.json() // IDK if it needs to be here or what FIX ask martin
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/api/weather", controller.WeatherController);
app.use("/api/busdepartures", controller.BusController);
app.use("/api/announcements", controller.AnnouncementsController);
app.use("/api/test", controller.test);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
