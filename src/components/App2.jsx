import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Background from "./Background";
import BackgroundShared from "./BackgroundShared";
import { useSelector } from "react-redux";
import authSelectors from "../redux/slices/authSelectors";

const LogInForm = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));

export const App2 = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Background>
                <LogInForm />
              </Background>
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <BackgroundShared>
                <Home />
              </BackgroundShared>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};
