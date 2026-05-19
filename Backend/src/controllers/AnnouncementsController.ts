import { Router, Request, Response } from "express";
import { AnnouncementType } from "@models";
import { MakefetchWithRetry, print } from "@helpers";
import { prisma } from "@prismaclient";
import { Prisma } from "@generated/client";

const fetchWithRetry = MakefetchWithRetry("BusTimesController");
const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const AnnouncementsTable = await prisma.announcements.findMany();
        return res.json(AnnouncementsTable);
    } catch (err) {
        console.log("Get AnnouncementsController Error: ", err);
        return res.status(503).send("Get announcements router unavailable");
    }
})
router.put("/", async (req: Request, res: Response) => {
    try {
        const Body = req.body as AnnouncementType;
        await prisma.announcements.create({
            data: Body
        });
        return res.json("Added element to announcements");
    } catch (err) {
        console.log("Put AnnouncementsController Error: ", err);
        return res.status(503).send("Put announcements router unavailable");
    }
})
router.delete("/", async (req: Request, res: Response) => {
    try {
        return res.status(500).send("Delete announcements router under construction");
        const DeleteKey = req.body.DeleteKey;
        await prisma.announcements.delete({
            where: { DeleteKey: DeleteKey },
        });
        return res.json("Deleted element from announcements");
    } catch (err) {
        console.log("Delete AnnouncementsController Error: ", err);
        return res.status(503).send("Delete announcements router unavailable");
    }
})

export default router;