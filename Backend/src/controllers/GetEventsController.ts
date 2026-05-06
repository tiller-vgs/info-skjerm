/*
This file is for all GET-endpoints for events
For other endpoints, create new controllers
The route for these endpoints are {baseurl}/GetEvents/{endpoint}

Authored by @Marcus-Aastum
*/


import { Router, Request, Response } from "express";
import { context } from "@db";
import { EventsType } from "@models";

const router = Router();

router.get("/allevents", async (req: Request, res: Response) => {
  const events = await context.events.toList();
  res.json(events);
});

router.get("/eventbyid/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const eventItem = await context.events.findById(id);
  if (!eventItem) return res.status(404).send("Not found");
  res.json(eventItem);
});

router.get("/todaysevents", async (req: Request, res: Response) => {
  const events = await context.events.toList();
  const now = new Date();

  const todaysEvents = events.filter(e => {
    const start = e.starttime && new Date(e.starttime);
    const end = e.endtime && new Date(e.endtime);

    const isSameDay = (d: Date | null) =>
      d && d.getFullYear() === now.getFullYear() && d.getDate() === now.getDate();

    return (
      (start && isSameDay(start)) ||
      (end && isSameDay(end)) ||
      (start && end && now > start && now < end)
    );
  });

  res.json(todaysEvents);
});

router.get("/weeksevents", async (req: Request, res: Response) => {
  const events = await context.events.toList();
  const now = new Date();

  const sameWeek = (d1: Date, d2: Date) => {
    const oneJan = new Date(d1.getFullYear(), 0, 1);
    const week = (date: Date) => {
      const diff = (date.getTime() - oneJan.getTime()) / 86400000;
      return Math.floor((diff + oneJan.getDay()) / 7);
    };
    return d1.getFullYear() === d2.getFullYear() && week(d1) === week(d2);
  };

  const weekEvents: EventsType[] = events.filter((e) => {
    const start = e.starttime && new Date(e.starttime);
    const end = e.endtime && new Date(e.endtime);

    if (start && sameWeek(now, start)) return true;
    if (end && sameWeek(now, end)) return true;
    if (start && end && start < now && end > now) return true;
    return false;
  });

  if (weekEvents.length === 0) return res.status(404).send("No events in this week");
  res.json(weekEvents);
});

export default router;