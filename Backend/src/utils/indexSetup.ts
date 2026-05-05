import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import tsconfig from "../../tsconfig.json"

// console.log(tsconfig)
const defaultindexPATHList = ["../controllers"];
const objectindexPATHList = ["../models"];

// const indexPATHList: {default: boolean, PATH: string, RelativePATH: string}[] = [];

// for (const PATH of [...objectindexPATHList]) {
//     indexPATHList.push({false, PATH, `../../src/${PATH}`});
// }

// const indexPATHList = [...defaultindexPATHList, ...objectindexPATHList];

// const fs = require("fs");
// const path = require("path");

// __dirname = path.dirname()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

for (const indexPATH of objectindexPATHList) {
	const directoryPath = path.join(__dirname, indexPATH);
    const files = fs.readdirSync(directoryPath).filter((file) => { return file.endsWith(".ts") && !file.endsWith("index.ts"); });
    fs.readFile(directoryPath + "/index.ts", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }

        console.log("directoryPath:  ", directoryPath, "   files:  ", files);
        const NewindexContent = files.map((file) => {
            const filename = file.replace(".ts", "");
            return `export * from './${filename}';\n`;
        })

        console.log("File content:", data);
        let indexContent: string = "";
        let exportPlaced: boolean = false;
        const DontRemoember: string = "export * from"
        for (const line of data.split("\n")) {
            if (line.slice(0, DontRemoember.length) !== DontRemoember) {
                indexContent += line;
            } else if (!exportPlaced) {
                indexContent += NewindexContent;
                exportPlaced = true;
            }
        }
        fs.writeFileSync(directoryPath, indexContent);
    });
}
for (const indexPATH of defaultindexPATHList) {
    const directoryPath = path.join(__dirname, indexPATH);
    const files = fs.readdirSync(directoryPath).filter((file) => { return file.endsWith(".ts") && !file.endsWith("index.ts"); });
    fs.readFile(directoryPath + "/index.ts", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }

        console.log("directoryPath:  ", directoryPath, "   files:  ", files);
        const NewindexContent = files.map((file) => {
            const filename = file.replace(".ts", "");
            return `export { default as ${filename} } from './${filename}';\n`; 
        })

        console.log("File content:", data);
        let indexContent: string = "";
        let exportPlaced: boolean = false;
        const DontRemoember: string = "export { default ";
        for (const line of data.split("\n")) {
            if (line.slice(0, DontRemoember.length) !== DontRemoember) {
                indexContent += line;
            } else if (!exportPlaced) {
                indexContent += NewindexContent;
                exportPlaced = true;
            }
        }
        fs.writeFileSync(directoryPath, indexContent);
    });
}
