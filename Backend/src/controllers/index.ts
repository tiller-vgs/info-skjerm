

import fs from 'fs'
import path from "path";
// const fs = require("fs");
// const path = require("path");


const directoryPath = path.join(__dirname, "folder");
const files = fs.readdirSync(directoryPath).filter(file => file.endsWith(".ts"));

const indexContent = files
	.map((file) => {
		const filename = file.replace(".ts", "");
		return `export { default as ${filename} } from './folder/${filename}';`;
	}).join("\n");

fs.writeFileSync(path.join(__dirname, "folder/index.ts"), indexContent);


// import { response } from "express";

// context("./folder", true, /\.ts$/)
// import
// const context = require.context("./folder", true, /\.ts$/);
// const exports: any = {};
// const modules = import.meta.glob("../controllers/*.ts", { eager: true });

// export const files = Object.entries(modules).reduce(
// 	(acc, [path, module]) => {
// 		const filename = path.split("/").pop()?.replace(".ts", "");
// 		if (filename) {
// 			acc[filename] = (module as any).default;
// 		}
// 		return acc;
// 	},
// 	{} as Record<string, any>,
// );

// export {default as BusTimesController} from "./BusTimesController.ts";
// export {default as deleteEventsRouter} from "./DeleteEventsController.ts";
// export {default as getEventsRouter} from "./GetEventsController.ts";
// export {default as postEventsRouter} from "./PostEventsController.ts";
// export {default as WeatherForecastController} from "./WeatherForecastController.ts";
// export {default as WeatherController} from "./!WeatherController.ts";
// export {default as DatabaseController} from "./!DatabaseController.ts";
// export {default as BusController} from "./!BusController.ts";
// export {default as test} from "./test.ts";
