import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import LoginSuccessful from "./pages/auth/LoginSuccessful";
import OuterScreen from "./pages/OuterScreen";
import PublicRoute from "./components/PublicRoute";
// import PrivatePage from "./components/PrivatRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/" element={<OuterScreen />}
        />
        <Route
          path="/tracking-screen"
          element={
            // <PrivatePage>
              <Home />
            // </PrivatePage>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login-successful"
          element={
            // <PrivatePage>
            <LoginSuccessful />
            // </PrivatePage>
          }
        />
      </Routes>
    </>
  );
};

export default App;
