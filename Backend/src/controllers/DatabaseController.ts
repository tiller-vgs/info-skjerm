import { Router, Request, Response } from "express";
import { prisma } from "@prismaclient";
import { codes } from "@helpers"

const router = Router();

router.put("/", async (req: Request, res: Response) => {
  // Fill in with what frontend sends
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
    // Check if its the right format ( x 1-9 )
    try {
      if (!/^[1-9]$/.test(WhatToChangeTo as string)) {
        return res.status(400).send("dayamount" + codes.format);
      }
      WhatToChangeTo = Number(WhatToChangeTo as string);
    } catch (err) {
      console.log("DatabaseController -- Error with checking format", err);
      return res.status(400).send(codes.format_type);
    }
    // UPDATE AdminTable SET dayamount = ? (WhatToChangeTo)
  }
  
  else if (WhatToChange === "timeseries") {
    // Check if its the right format [ xx-xx 00|23-00|59, ... ]
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
    // Check if its the right format ( xx-xx 00|12-00|31 )
    try {
      if (!/^(0[1-9]|1[0-2])-([1-2][1-9]|3[0-1])$/.test(WhatToChangeTo as string)) {
        return res.status(400).send("startdate" + codes.format);
      }
    } catch (err) {
      console.log("DatabaseController -- Error with checking format", err);
      return res.status(400).send(codes.format_type);
    }
    // UPDATE AdminTable SET startdate = ? (WhatToChangeTo)
  }
  else {
    return res.status(400).send("What you want to change dosen't exist or can't be changed");
  }
  
  await prisma.adminTable.update({ where: { id: 1 }, data: { [WhatToChange]: WhatToChangeTo } });
  console.log("Changed AdminTable:  ", { [WhatToChange]: WhatToChangeTo });
  res.json("Changed AdminTable");
})

export default router;