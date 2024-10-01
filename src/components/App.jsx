import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import authSelectors from "../redux/slices/authSelectors";

import Background from "./Background";
import BackgroundShared from "./BackgroundShared";
import PrivateRoute from "./PrivateRoute";

const LogInForm = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const HomePage = lazy(() => import("../pages/HomaPage/Home"));
const IncomePage = lazy(() => import("../pages/IncomePage/IncomePage"));
const ExpensesPage = lazy(() => import("../pages/ExpensesPage/Expense"));
const Report = lazy(() => import("../pages/Report"));

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
          path="/register"
          element={
            !isLoggedIn ? (
              <Background>
                <Register />
              </Background>
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />
        <Route element={<PrivateRoute />}>
          <Route element={<BackgroundShared />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/home/income" element={<IncomePage />} />
            <Route path="/home/expenses" element={<ExpensesPage />} />
            <Route path="/reports" element={<Report />} />
          </Route>
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};
