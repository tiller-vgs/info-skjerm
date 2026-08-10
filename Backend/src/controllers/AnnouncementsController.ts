import { Router, Request, Response } from "express";
import { AnnouncementType } from "@models";
import { prisma } from "@prismaclient";
import { print } from "utils";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "lib/auth";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const AnnouncementsTable = await prisma.announcements.findMany();
    return res.json(AnnouncementsTable);
  } catch (err) {
    console.log("Get AnnouncementsController Error: ", err);
    return res.status(503).send("Get announcements router unavailable");
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
    print("req", req);
    const Body = req.body as AnnouncementType;
    await prisma.announcements.create({
      data: Body,
    });
    return res.json("Added element to announcements");
  } catch (err) {
    console.log("Put AnnouncementsController Error: ", err);
    return res.status(503).send("Put announcements router unavailable");
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
    const id = req.body.id;
    await prisma.announcements.delete({
      where: { id: id },
    });
    return res.json("Deleted element from announcements");
  } catch (err) {
    console.log("Delete AnnouncementsController Error: ", err);
    return res.status(503).send("Delete announcements router unavailable");
  }
});

export default router;
