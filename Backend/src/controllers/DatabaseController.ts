import { Router, Request, Response } from "express";
import { prisma } from "@prismaclient";
import { codes } from "@helpers"

const router = Router();

router.put("/", async (req: Request, res: Response) => {
  // fill in from req however frontend wants to send what to change
  let WhatToChange: string;
  let WhatToChangeTo: string | string[] | number;
  try{
    WhatToChange = req.body.WhatToChange.toLowerCase();
    WhatToChangeTo = req.body.WhatToChangeTo;
  } catch (err) {
    console.log("DatabaseController -- Error with setting varibles from request", err);
    return res.status(400).send(codes.type);
  }

  if (WhatToChange === "dayamount") {
    // check if its the right format ( x 1-9 )
    try {
      if (!/^[1-9]$/.test(WhatToChangeTo as string)) {
        return res.status(400).send("dayamount" + codes.format); // give better response FIX
      }
      WhatToChangeTo = Number(WhatToChangeTo as string);
    } catch (err) {
      console.log("DatabaseController -- Error with checking format", err);
      return res.status(400).send(codes.format_type);
    }

    // UPDATE AdminTable SET dayamount = ? (WhatToChangeTo)
  }
  
  else if (WhatToChange === "timeseries") {
    // check if its the right format [ xx-xx 00|23-00|59, ... ]
    try {
      if (!(WhatToChangeTo as string[]).every(item => /^(0[0-9]|1[0-9]|2[0-3]):00-([0-5][0-9]):00$ /.test(item))) {
        return res.status(400).send("timeseries" + codes.format);
      }
		} catch (err) {
			console.log("DatabaseController -- Error with checking format", err);
      return res.status(400).send(codes.format_type);
		}
    // UPDATE AdminTable SET timeseries = ? (WhatToChangeTo)
  }
  
  else if (WhatToChange === "startdate") {
    // check if its the right format ( xx-xx 00|12-00|31 )
    try {
      if (!/^(0[1-9]|1[0-2])-([1-2][1-9]|3[0-1])$/.test(WhatToChangeTo as string)) {
        return res.status(400).send("startdate" + codes.format); // give better response FIX
      }
    } catch (err) {
      console.log("DatabaseController -- Error with checking format", err);
      return res.status(400).send(codes.format_type);
    }
    // UPDATE AdminTable SET startdate = ? (WhatToChangeTo)
  }
  else {
    return res.status(400).send("What you want to change dosen't exist or can't be changed"); // give better response FIX
  }
  
  await prisma.adminTable.update({ where: { id: 1 }, data: { [WhatToChange]: WhatToChangeTo } });
  console.log("Changed AdminTable");
  res.json("Changed AdminTable");
})

export default router;