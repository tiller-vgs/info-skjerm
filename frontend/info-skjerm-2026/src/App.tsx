import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Infoskjerm from "./pages/Infoskjerm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Infoskjerm />} />
          <Route path="admin"></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
