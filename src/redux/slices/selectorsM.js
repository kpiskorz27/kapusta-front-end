export const selectIsLoggedIn = (store) => store.auth?.isLoggedIn || false;

export const selectUser = (store) => store.auth?.user?.email || null;

export const selectToken = (store) => store.auth?.token || null;

export const selectIsFetchingCurrentUser = (store) =>
  store.auth?.isFetchingCurrentUser || false;

export const selectAllTransactions = (store) =>
  store.transactions?.allTransactions || [];

export const selectIncomeTransactions = (store) =>
  store.transactions?.income?.incomeTransactions || [];

export const selectExpenseTransactions = (store) =>
  store.transactions?.expenses?.expenseTransactions || [];

export const selectIncomeSummary = (store) =>
  store.transactions?.income?.monthsStats || {};

export const selectExpensesSummary = (store) =>
  store.transactions?.expenses?.monthsStats || {};

export const selectBalance = (store) => store.transactions?.newBalance || 0;

export const selectReports = (store) => store.reports || {};

export const selectIncomeTotal = (store) =>
  store.reports?.reports?.incomes?.incomeData?.Total || 0;

export const selectExpensesTotal = (store) =>
  store.reports?.reports?.expenses?.expenseTotal || 0;

export const selectIsLoading = (store) =>
  store.transactions?.isLoading || false;

export const selectDataChart = (store) =>
  store.reportsQuery?.filteredData || [];

export const selectReportsQuery = (store) =>
  store.reportsQuery?.reportsQuery || {};
