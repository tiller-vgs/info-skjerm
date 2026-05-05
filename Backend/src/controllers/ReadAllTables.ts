import {prisma} from "@prismaclient";

export const AllValues = [await prisma.user.findMany(), await prisma.adminTable.findMany(), await prisma.verification.findMany(), await prisma.account.findMany(), await prisma.session.findMany()];
const AdminTable = await prisma.adminTable.findMany();

