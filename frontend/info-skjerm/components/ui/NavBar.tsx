import Link from "next/link";

export function NavBar() {
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
