import React from "react";
import { Routes, Route } from "react-router-dom";
import Report from "../pages/Report";
import HomePage from "../pages/HomaPage/Home";
import IncomePage from "../pages/IncomePage/IncomePage";
import ExpensesPage from "../pages/ExpensesPage/Expense";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="kapusta-front-end/" element={<HomePage />} />
        <Route path="kapusta-front-end/income" element={<IncomePage />} />
        <Route path="kapusta-front-end/expenses" element={<ExpensesPage />} />
        <Route path="kapusta-front-end/report" element={<Report />} />
      </Routes>
    </div>
  );
};
