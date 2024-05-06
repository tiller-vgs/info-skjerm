// "use client";
import { signOut } from "@/auth";
import { Button } from "./button";

const handleSignOut = async () => {
  return await signOut();
};

export function NavBar() {
  return (
    <main>
      <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Info-skjerm</h1>
        </div>
        <div className="flex items-center space-x-4">
          <a href="/" className="hover:underline">
            Hjem
          </a>
          <a href="/admin" className="hover:underline">
            Admin
          </a>
          <a href="/auth/signin" className="hover:underline">
            Logg inn
          </a>
          <a href="/auth/signout" className="hover:underline">
            Logg ut
          </a>
          {/* <Button onClick={() => handleSignOut()}>Logg ut</Button> */}
        </div>
      </nav>
    </main>
  );
}
