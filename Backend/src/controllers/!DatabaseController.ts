import { Router, Request, Response } from "express";

const router = Router();

router.post("/Databade", async (req: Request, res: Response) => {
  const WhatToChange: string = "" // fill in from req however frontend wants to send waht to change
  
  if (WhatToChange == "DayAmount") {
    const WhatToChangeTo: string = ""; // fill in from req however frontend wants to send what to change with
    // chech if its the right format ( xx-xx )
    if (!/^[1-9]$/.test(WhatToChangeTo)) {
      // return res.status(400).send("Bad Request"); // give better response
    }
    // UPDATE AdminTable SET DayAmount = ? (WhatToChangeTo)
  } else if (WhatToChange == "TimeSeries") {
    const WhatToChangeTo: string[] = [""]; // fill in from req however frontend wants to send what to change with
    if (!WhatToChangeTo.every((item) => /^(0[0-9]|1[0-9]|2[0-3]):00-(0[0-9]|1[0-9]|2[0-3]):00$/.test(item))) {
      // return res.status(400).send("Bad Request"); // give better response
    }
    // UPDATE AdminTable SET TimeSeries = ? (WhatToChangeTo)
  } else if (WhatToChange == "StartDate") {
    const WhatToChangeTo: string = ""; // fill in from req however frontend wants to send what to change with
    if (!/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(WhatToChangeTo)) {
      // return res.status(400).send("Bad Request"); // give better response
    }
    // UPDATE AdminTable SET StartDate = ? (WhatToChangeTo)
  } else {
    // return res.status(400).send("Bad Request"); // give better response
  }
})

export default router;