import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Navbar, Authorization } from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import InfoScreen from "./pages/Infoscreen";
import AdminDashboard from "./pages/AdminDashboard";
// import "@fontsource-variable/inter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="info-screen">
            <Route index element={<InfoScreen />} />
          </Route>
          <Route path="login">
            <Route index element={<Login />} />
          </Route>
          <Route
            path="admin"
            element={
              <Authorization>
                <Outlet />
              </Authorization>
            }
          >
            <Route path="dashboard">
              <Route index element={<AdminDashboard />} />
            </Route>
            <Route path="register" element={<div>Admin Register</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
