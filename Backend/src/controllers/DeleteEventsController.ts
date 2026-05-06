/*
This file is for all DELETE-endpoints for Events
For other endpoints, create new controllers
The route for these endpoints are {baseurl}/DeleteEvents/{endpoint}

Authored by @Marcus-Aastum
*/

import { Router, Request, Response } from "express";
import { context } from "@db";

const router = Router();

router.delete("/byid/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const eventItem = await context.events.findById(id);
    if (!eventItem) {
        return res.status(404).send("Event not found");
    }

    await context.events.delete(id);

    return res.status(200).send("Deleted");
});

export default router;