import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import { RecoilRoot } from "recoil";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <DashBoard /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/signin"
            element={isAuthenticated ? <Navigate to="/" /> : <SignIn />}
          />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
