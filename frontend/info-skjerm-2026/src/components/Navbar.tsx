import { NavLink, Outlet, useNavigate } from "react-router";
import { authClient } from "../lib/auth-client";

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();

  async function handleSignOut() {
    await authClient.signOut();
    navigate("/login");
  }

  if (isPending) return null;

  console.log(session?.user);

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
            {session?.user?.role === "ADMIN" && (
              <h3 className="text-yellow-500 font-bold">
                {session?.user.name} - Admin
              </h3>
            )}

            {session?.user?.role === "MODERATOR" && (
              <h3 className="text-yellow-500 font-bold">
                {session?.user.name} - Moderator
              </h3>
            )}

            <NavLink className="hover:text-tkyellow transition" to={"/"}>
              Hjem
            </NavLink>
            <NavLink
              className="hover:text-tkyellow transition"
              to={"/info-screen"}
            >
              Infoskjerm
            </NavLink>

            {!session?.user && (
              <NavLink className="hover:text-tkyellow transition" to={"/login"}>
                Logg inn
              </NavLink>
            )}

            {session?.user.role === "ADMIN" && (
              <div className="flex items-center gap-6">
                <NavLink
                  className="hover:text-tkyellow transition"
                  to={"/admin/dashboard"}
                >
                  Adminpanel
                </NavLink>
              </div>
            )}
            {session?.user.role === "ADMIN" ||
              (session?.user.role === "MODERATOR" && (
                <div className="flex items-center gap-6">
                  <NavLink
                    className="hover:text-tkyellow transition"
                    to={"/calendar"}
                  >
                    Rediger kalender
                  </NavLink>
                </div>
              ))}
            {session?.user && (
              <button
                className="hover:text-red-400 transition cursor-pointer"
                onClick={handleSignOut}
              >
                Logg ut
              </button>
            )}
          </nav>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
