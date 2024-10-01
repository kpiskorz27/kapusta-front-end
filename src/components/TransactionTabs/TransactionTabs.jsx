import React from "react";
import { StyledTabsMobile, StyledTabsDesktop } from "./Styles";

export const TransactionTabsMobile = ({ setActiveTab }) => {
  return (
    <StyledTabsMobile>
      <button
        className="TabMobile"
        onClick={() => {
          console.log("Setting to expenses");
          setActiveTab("expenses");
        }}
      >
        expenses
      </button>
      <button
        className="TabMobile"
        onClick={() => {
          console.log("Setting to income");
          setActiveTab("income");
        }}
      >
        income
      </button>
    </StyledTabsMobile>
  );
};

export const TransactionTabsDesktop = ({ setActiveTab }) => {
  return (
    <StyledTabsDesktop>
      <button
        className="TabDesktop"
        onClick={() => {
          console.log("Setting to expenses");
          setActiveTab("expenses");
        }}
      >
        expenses
      </button>
      <button
        className="TabDesktop"
        onClick={() => {
          console.log("Setting to income");
          setActiveTab("income");
        }}
      >
        income
      </button>
    </StyledTabsDesktop>
  );
};
