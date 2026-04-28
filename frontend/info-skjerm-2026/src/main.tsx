import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import InfoScreen from "./pages/InfoScreen";
import "@fontsource-variable/inter";
import Infoskjerm from "./pages/Infoskjerm";

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
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
