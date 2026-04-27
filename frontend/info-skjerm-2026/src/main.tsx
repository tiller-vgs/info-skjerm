import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@fontsource-variable/inter";
import { BrowserRouter, Route, Routes } from "react-router";
import Infoskjerm from "./pages/Infoskjerm";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Infoskjerm />} />
          <Route path="admin"></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
