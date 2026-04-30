import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import {Navbar, Authorization} from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import InfoScreen from "./pages/Infoscreen";
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
          <Authorization>
            <Route path="admin">
              {/* Temp */}
              <Route path="dashboard" element={<div>Admin Dashboard</div>} />
              <Route path="register" element={<div>Admin Register</div>} />
            </Route>
          </Authorization>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
