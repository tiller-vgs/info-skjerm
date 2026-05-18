import type { PropsWithChildren } from "react";
import { NavLink, Outlet, Navigate } from "react-router";

export const currentUser = {
  isLoggedIn: true,
};

export const Authorization = ({ children }: PropsWithChildren) => {
  if (!currentUser.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export function Navbar() {
  return (
    <>
      <div className="group">
        {/* Hitbox, if touched; Navbar shows  */}
        <div className="fixed top-0 left-0 w-full h-15 z-40"></div>
        {/* Navigation bar */}
        <div
          className=" fixed top-0 left-0 w-full
      flex items-center justify-between px-6 py-4
      bg-tqnavbar text-tqwhite shadow-md

      transform -translate-y-full opacity-0
      transition-all duration-300 ease-in-out 

      group-hover:translate-y-0 group-hover:opacity-100
      hover:translate-y-0 hover:opacity-100

      z-50"
        >
          {/* Tittel */}
          <h1 className="text-5xl font-bold text-tkyellow">
            <NavLink to={"/"}>Infoskjerm</NavLink>
          </h1>
          {/* Valg alle har */}
          <nav className="flex items-center gap-6">
            <NavLink className="hover:text-tkyellow transition" to={"/"}>
              Hjem
            </NavLink>
            <NavLink
              className="hover:text-tkyellow transition"
              to={"/info-screen"}
            >
              Infoskjerm
            </NavLink>
            {/* Valg hvis ikke logged inn */}
            {!currentUser?.isLoggedIn && (
              <NavLink className="hover:text-tkyellow transition" to={"/login"}>
                Logg in
              </NavLink>
            )}
            {/* Valg hvis logged inn (som admin) */}
            {currentUser?.isLoggedIn && (
              <div className="flex items-center gap-6">
                <NavLink
                  className="hover:text-tkyellow transition"
                  to={"/admin/dashboard"}
                >
                  Adminpanel
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
