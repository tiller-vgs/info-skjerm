function Navbar() {

    const currentUser = {
        isLoggedIn: false,
        isNotLoggedIn: true,
    } 

  return (
    <div>
      <h1>Infoskjerm</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/info-board">Info Board</a>

        {currentUser?.isNotLoggedIn && <a href="/login">Login</a>}

        {currentUser?.isLoggedIn && (
          <div className="flex ">
            <a href="/admin/dashboard">Admin Dashboard</a>
            <a href="/admin/register">Register user</a>
            {/* Må legge til logg ut til denne */}
            <a href="/login">Log out</a>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
