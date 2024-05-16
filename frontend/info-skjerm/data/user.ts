import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.users.findUnique({
      where: { email },
    });

    return user;
  } catch (error) {
    return null;
  }
};
