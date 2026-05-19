import { lazy, Suspense } from "react";
import "./index.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Navbar, Authorization } from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const InfoScreen = lazy(() => import("./pages/Infoscreen"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function App() {
  return (
    <>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </BrowserRouter>
    <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
