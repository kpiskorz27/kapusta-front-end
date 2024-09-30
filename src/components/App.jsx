import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import authSelectors from "../redux/slices/authSelectors";

import Report from "../pages/Report";
import HomePage from "../pages/HomaPage/Home";
import IncomePage from "../pages/IncomePage/IncomePage";
import ExpensesPage from "../pages/ExpensesPage/Expense";

import Background from "./Background";
import BackgroundShared from "./BackgroundShared";

const LogInForm = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));

export const App = () => {
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

        <Route path="kapusta-front-end/" element={<HomePage />} />
        <Route path="kapusta-front-end/income" element={<IncomePage />} />
        <Route path="kapusta-front-end/expenses" element={<ExpensesPage />} />
        <Route path="kapusta-front-end/report" element={<Report />} />

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};
