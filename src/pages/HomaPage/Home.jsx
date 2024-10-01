import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useMatchMedia } from "../../hooks/use-match-media";
import GrayBg from "../../components/GrayBg";
import ReportsBtn from "../../components/Buttons/ReportsBtn/ReportsBtn";
import ChangeBalance from "../../components/ChangeBalance/ChangeBalance";
import DateSelection from "../../components/DateSelection/DateSelection";
import { StyledHomePage } from "./Styles";
import { TransactionsList } from "../../components/TransactionsList/TransactionsList";
import {
  TransactionTabsMobile,
  TransactionTabsDesktop,
} from "../../components/TransactionTabs/TransactionTabs";

import IncomePage from "../IncomePage/IncomePage";
import ExpensesPage from "../ExpensesPage/Expense";

export default function HomePage() {
  const [startDate, setStartDate] = useState(new Date());
  const { isMobile } = useMatchMedia();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("income");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "income":
        return <IncomePage />;
      case "expenses":
        return <ExpensesPage />;
      default:
        return <IncomePage />;
    }
  };

  return (
    <>
      <GrayBg />
      <StyledHomePage>
        <div className="flexWrapper">
          {isMobile && <ReportsBtn to="/report" state={{ from: location }} />}
          <ChangeBalance />
          {!isMobile && <ReportsBtn to="/report" state={{ from: location }} />}
        </div>
        {isMobile && (
          <div className="datePickerMobWrap">
            <DateSelection startDate={startDate} setStartDate={setStartDate} />
          </div>
        )}
        {isMobile && <TransactionTabsMobile setActiveTab={setActiveTab} />}
        {!isMobile && <TransactionTabsDesktop setActiveTab={setActiveTab} />}
        {renderActiveTab()}
        {isMobile && <TransactionsList />}
      </StyledHomePage>
    </>
  );
}
