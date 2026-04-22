import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Infoskjerm from "./pages/Infoskjerm";

function App() {
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
