import React from "react";
import { Link, NavLink } from "react-router-dom";
import { StyledTabsMobile, StyledTabsDesktop } from "./Styles";

export const TransactionTabsMobile = () => {
  return (
    <StyledTabsMobile>
      <Link to="/home/expenses" className="TabMobile">
        expenses
      </Link>
      <Link to="/home/income" className="TabMobile">
        income
      </Link>
    </StyledTabsMobile>
  );
};

export const TransactionTabsDesktop = () => {
  return (
    <StyledTabsDesktop>
      <NavLink to="expenses" className="TabDesktop">
        expenses
      </NavLink>
      <NavLink to="income" className="TabDesktop">
        income
      </NavLink>
    </StyledTabsDesktop>
  );
};
