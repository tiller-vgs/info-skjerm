import { auth } from "@/auth";
import Link from "next/link";

export async function NavBar() {
  const session = await auth();
  return (
    <main>
      <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <Link href="/infoskjerm">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Infoskjerm</h1>
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          <a href="/" className="hover:underline">
            Hjem
          </a>
          <a href="/admin" className="hover:underline">
            Admin
          </a>
          {session && (
            <a href="/auth/signout" className="hover:underline">
              Logg ut
            </a>
          )}
        </div>
      </nav>
    </main>
  );
}
