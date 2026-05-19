import { GetWeatherAPI } from "@controllers";
import { prisma } from "@prismaclient";
import type { DayOfWeatherObjects } from "@models";
import { print } from "./TestPrinting";
import { Prisma } from "@generated/client";


const ADayOfWeatherObjects = (await GetWeatherAPI(2))[1]! as DayOfWeatherObjects;
const ADayOfWeatherObjectsJSON = JSON.parse(JSON.stringify(ADayOfWeatherObjects));

await prisma.earlyerWeatherdays.update({
	where: { id: 1 },
	data: {
		date: ADayOfWeatherObjects.date,
		data: { ...ADayOfWeatherObjectsJSON },
	},
});

const response = (await prisma.earlyerWeatherdays.findUnique({ where: { id: 1 } }))!.data!;
const jsonData = response.valueOf() as DayOfWeatherObjects;
print("CRONJOB DONE:   ", ADayOfWeatherObjectsJSON, jsonData);

