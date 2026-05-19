import type { PropsWithChildren } from "react";
import { NavLink, Outlet, Navigate, useNavigate } from "react-router";
import { authClient } from "../lib/auth-client";

export const Authorization = ({ children }: PropsWithChildren) => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return null;
  if (!session?.user) return <Navigate to="/login" />;

  return children;
};

export function Navbar() {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();
  const isLoggedIn = !!session?.user;

  async function handleSignOut() {
    await authClient.signOut();
    navigate("/login");
  }

  return (
    <>
      <div className="group">
        {/* Hitbox */}
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
          <h1 className="text-5xl font-bold text-tkyellow">
            <NavLink to={"/"}>Infoskjerm</NavLink>
          </h1>
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

            {!isLoggedIn && (
              <NavLink className="hover:text-tkyellow transition" to={"/login"}>
                Logg in
              </NavLink>
            )}

            {isLoggedIn && (
              <div className="flex items-center gap-6">
                <NavLink
                  className="hover:text-tkyellow transition"
                  to={"/admin/dashboard"}
                >
                  Adminpanel
                </NavLink>
                <button
                  className="hover:text-red-400 transition cursor-pointer"
                  onClick={handleSignOut}
                >
                  Logg ut
                </button>
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
