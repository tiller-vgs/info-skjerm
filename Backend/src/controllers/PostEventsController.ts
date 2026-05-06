/*
This file is for all POST-endpoints for Events
For other endpoints, create new controllers
The route for these endpoints are {baseurl}/PostEvents/{endpoint}

Authored by @Marcus-Aastum
*/

import { Router, Request, Response } from "express";
import { context } from "@db";
import { EventsType } from "@models";

const router = Router();

router.post("/createevent", async (req: Request, res: Response) => {
  const eventData = req.body as EventsType;

  if (!eventData.title || eventData.title.length === 0) {
    return res.status(400).send("Event must have a title");
  }

  try {
    const created = await context.events.create(eventData);
    return res.status(200).json(created);
  } catch (err: any) {
    return res.status(400).send(err.message);
  }
});

export default router;