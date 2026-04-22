import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Infoscreen from "./pages/Infoscreen";
import Navbar from "./components/Navbar";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Navbar/>}/>
        <Route path="/">
          <Route index element={<Infoscreen />} />
        </Route>
        <Route path="admin"></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
