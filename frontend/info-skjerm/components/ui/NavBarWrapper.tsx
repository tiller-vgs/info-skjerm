import { auth } from "@/auth";
import { NavBar } from "./NavBar";

export async function NavBarWrapper() {
  const session = await auth();
  return <NavBar session={session} />;
}
