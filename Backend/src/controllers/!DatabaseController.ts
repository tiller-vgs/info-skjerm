import { Router, Request, Response } from "express";
import { prisma } from "../prisma";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const WhatToChange: string = "" // fill in from req however frontend wants to send waht to change
  let WhatToChangeTo: string | string[];
  
  if (WhatToChange == "DayAmount") {
    WhatToChangeTo = ""; // fill in from req however frontend wants to send what to change with
    // check if its the right format ( x 1-9 )
    if (!/^[1-9]$/.test(WhatToChangeTo)) {
      return res.status(400).send("Bad Request"); // give better response FIX
    }
    // UPDATE AdminTable SET DayAmount = ? (WhatToChangeTo)
  }
  
  else if (WhatToChange == "TimeSeries") {
    WhatToChangeTo = [""]; // fill in from req however frontend wants to send what to change with
    // check if its the right format [ xx-xx 00|23-00|59, ... ]
    if (!WhatToChangeTo.every((item) => /^(0[0-9]|1[0-9]|2[0-3]):00-([0-5][0-9]):00$ /.test(item))) {
      return res.status(400).send("Bad Request"); // give better response FIX
    }
    // UPDATE AdminTable SET TimeSeries = ? (WhatToChangeTo)
  }
  
  else if (WhatToChange == "StartDate") {
    WhatToChangeTo = ""; // fill in from req however frontend wants to send what to change with
    // check if its the right format ( xx-xx 00|12-00|31 )
    if (!/^(0[1-9]|1[0-2])-([1-2][1-9]|3[0-1])$/.test(WhatToChangeTo)) {
      return res.status(400).send("Bad Request"); // give better response FIX
    }
    // UPDATE AdminTable SET StartDate = ? (WhatToChangeTo)
  }
  else {
    return res.status(400).send("Bad Request"); // give better response FIX
  }
  
  await prisma.adminTable.update({ where: { id: 1 }, data: { [WhatToChange]: WhatToChangeTo } });
})

export default router;