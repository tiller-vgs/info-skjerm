import { PrismaPg } from "@prisma/adapter-pg";
import {PrismaClient} from "../prisma/generated/client";
// import {PrismaClient} from "@prisma/client";

// export const prisma = new PrismaClient({
  
// });

export const prisma = new PrismaClient({
  adapter: new PrismaPg({connectionString: process.env.DATABASE_URL}),
  // datasourceUrl: process.env.DATABASE_URL,
});