import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import {PrismaClient} from "../../prisma/generated/client";


if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL in /lib/prisma.ts not found:   " + process.env.DATABASE_URL);
}

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };

// import {PrismaPg} from "@prisma/adapter-pg";
// import {PrismaClient} from "../prisma/generated/client";


// export const My_env = process.env.DATABASE_URL;

// export const prisma = new PrismaClient({
// 	adapter: new PrismaPg({connectionString: process.env.DATABASE_URL}),
// });


    
// import { PrismaClient } from '@prisma/client'

// Prevent multiple instances of Prisma Client in development

// declare global {
//   var prisma: PrismaClient | undefined
// }

// export const prisma = global.prisma || new PrismaClient()

// if (process.env.NODE_ENV !== 'production') global.prisma = prisma