import { Router, type Request, type Response } from "express";
import { prisma } from "@prismaclient";
import type { CalendarEventType } from "@models";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "lib/auth";

const router = Router();

const parseEventDates = (body: CalendarEventType) => {
  const start = new Date(body.start);
  const end = new Date(body.end);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return null;
  }

  return {
    start,
    end,
  };
};

router.get("/", async (_req: Request, res: Response) => {
  try {
    const events = await prisma.classCalendarEvent.findMany({
      orderBy: { start: "asc" },
    });

    return res.json(events);
  } catch (error) {
    console.error("Get CalendarController Error:", error);
    return res.status(503).send("Get calendar events unavailable");
  }
});

router.post("/", async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session || !["ADMIN", "MODERATOR"].includes(session?.user?.role)) {
    return res.status(403).send("Unauthorized");
  }
  try {
    const body = req.body as CalendarEventType;
    const parsedDates = parseEventDates(body);

    if (!body.title || !body.groupId || !body.resourceId || !parsedDates) {
      return res.status(400).send("Invalid calendar event payload");
    }

    let recurrenceUntil: Date | null = null;
    if (body.recurrenceUntil) {
      recurrenceUntil = new Date(body.recurrenceUntil);
      if (Number.isNaN(recurrenceUntil.getTime())) {
        return res.status(400).send("Invalid recurrence end date");
      }

      if (recurrenceUntil < parsedDates.start) {
        return res
          .status(400)
          .send("Recurrence end date must be after event start");
      }
    }

    const maxSeriesLength = 520;
    const eventsToCreate: Array<{
      title: string;
      start: string;
      end: string;
      createdBy: string;
      updatedBy: string;
      groupId: string;
      resourceId: string;
      allDay: boolean;
      desc: string | null;
    }> = [];

    const seriesEnd = recurrenceUntil
      ? new Date(recurrenceUntil.setHours(23, 59, 59, 999))
      : null;
    let nextStart = new Date(parsedDates.start);
    let nextEnd = new Date(parsedDates.end);

    do {
      eventsToCreate.push({
        title: body.title,
        start: nextStart.toISOString(),
        end: nextEnd.toISOString(),
        createdBy: session?.user.name || "unknown",
        updatedBy: session?.user.name || "unknown",
        groupId: body.groupId,
        resourceId: body.resourceId,
        allDay: body.allDay ?? false,
        desc: body.desc ?? null,
      });

      if (!seriesEnd) {
        break;
      }

      nextStart = new Date(nextStart.getTime() + 7 * 24 * 60 * 60 * 1000);
      nextEnd = new Date(nextEnd.getTime() + 7 * 24 * 60 * 60 * 1000);
    } while (nextStart <= seriesEnd && eventsToCreate.length < maxSeriesLength);

    if (
      seriesEnd &&
      eventsToCreate.length === maxSeriesLength &&
      nextStart <= seriesEnd
    ) {
      return res
        .status(400)
        .send("Recurrence range too long. Please choose an earlier end date.");
    }

    const createdEvents = await prisma.$transaction(
      eventsToCreate.map((data) => prisma.classCalendarEvent.create({ data })),
    );

    return res.json(createdEvents);
  } catch (error) {
    console.error("Post CalendarController Error:", error);
    return res.status(503).send("Create calendar event unavailable");
  }
});

router.put("/", async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session || !["ADMIN", "MODERATOR"].includes(session?.user?.role)) {
    return res.status(403).send("Unauthorized");
  }

  try {
    const body = req.body as CalendarEventType;
    const parsedDates = parseEventDates(body);

    if (!body.id) {
      return res.status(400).send("Missing event id");
    }

    if (!body.title || !body.groupId || !body.resourceId || !parsedDates) {
      return res.status(400).send("Invalid calendar event payload");
    }

    const event = await prisma.classCalendarEvent.update({
      where: { id: Number(body.id) },
      data: {
        title: body.title,
        start: parsedDates.start.toISOString(),
        updatedBy: session?.user.name || "unknown",
        end: parsedDates.end.toISOString(),
        groupId: body.groupId,
        resourceId: body.resourceId,
        allDay: body.allDay ?? false,
        desc: body.desc ?? null,
      },
    });

    return res.json(event);
  } catch (error) {
    console.error("Put CalendarController Error:", error);
    return res.status(503).send("Update calendar event unavailable");
  }
});

router.delete("/", async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session || !["ADMIN", "MODERATOR"].includes(session?.user?.role)) {
    return res.status(403).send("Unauthorized");
  }

  try {
    const id = Number(req.body.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).send("Missing event id");
    }

    await prisma.classCalendarEvent.delete({ where: { id } });
    return res.json({ id });
  } catch (error) {
    console.error("Delete CalendarController Error:", error);
    return res.status(503).send("Delete calendar event unavailable");
  }
});

export default router;
