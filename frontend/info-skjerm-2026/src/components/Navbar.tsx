import { NavLink, Outlet } from "react-router";

function Navbar() {
  const currentUser = {
    isLoggedIn: true,
  };

  return (
    <>
      <div className="group">
        {/* Hitbox */}
        <div className="fixed top-0 left-0 w-full h-15 z-40"></div>
        {/* Navigation bar */}
        <div
          className=" fixed top-0 left-0 w-full
      flex items-center justify-between px-6 py-4
      bg-tqblue text-tqwhite shadow-md

      transform -translate-y-full opacity-0
      transition-all duration-300 ease-in-out 

      group-hover:translate-y-0 group-hover:opacity-100
      hover:translate-y-0 hover:opacity-100

      z-50"
        >
          <h1 className="text-5xl font-bold">
            <NavLink to={"/"}>Infoskjerm</NavLink>
          </h1>
          <nav className="flex items-center gap-6">
            <NavLink className="hover:text-blue-400 transition" to={"/"}>
              Hjem
            </NavLink>
            <NavLink
              className="hover:text-blue-400 transition"
              to={"/info-screen"}
            >
              Infoskjerm
            </NavLink>

            {!currentUser?.isLoggedIn && (
              <NavLink className="hover:text-blue-400 transition" to={"/login"}>
                Logg in
              </NavLink>
            )}

            {currentUser?.isLoggedIn && (
              <div className="flex items-center gap-6">
                <NavLink
                  className="hover:text-blue-400 transition"
                  to={"/admin/dashboard"}
                >
                  Adminpanel
                </NavLink>
                <NavLink
                  className="hover:text-blue-400 transition"
                  to={"/admin/register"}
                >
                  Registrer brukere
                </NavLink>
                <NavLink
                  className="hover:text-red-400 transition"
                  to={"/login"}
                >
                  Logg ut
                </NavLink>
                {/* Må legge til logg ut til denne */}
              </div>
            )}
          </nav>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
