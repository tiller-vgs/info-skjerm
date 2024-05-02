export function NavBar() {
  return (
    <main>
      <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="flex items-center space-x-4">
          {/* <img src="/logo.png" alt="Logo" className="w-12 h-12" /> */}
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
        </div>
      </nav>
    </main>
  );
}
