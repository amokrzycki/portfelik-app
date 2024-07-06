import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { ExpenseForm } from "./ExpenseForm";
import {
  addExpense as addExpenseToDB,
  fetchExpenses,
} from "../services/budgetService";
import { ExpenseChart } from "./ExpenseChart";
import { Expense, NewExpense } from "../types/Expense";
import ExpenseTable from "./ExpenseTable.tsx";
import { useExpenses } from "../context/ExpensesProvider.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.ts";

function Homepage() {
  const { expenses, setExpenses } = useExpenses();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const loadExpenses = async () => {
      if (user) {
        const fetchedExpenses = await fetchExpenses(user.uid);
        setExpenses(fetchedExpenses);
      }
    };
    loadExpenses().then((r) => console.log(r));
  }, [setExpenses]);

  const addExpense = async (expenseData: NewExpense) => {
    if (user) {
      const expenseId = await addExpenseToDB(user.uid, expenseData);
      const newExpense: Expense = { ...expenseData, id: expenseId };
      setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
    }
  };

  return (
    <Box
      id="expenses-wrapper"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        marginTop: "1rem",
        padding: "0 1rem",
      }}
    >
      <Box
        id="expense-form-chart-wrapper"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "1rem",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <ExpenseForm addExpense={addExpense} />
        <ExpenseChart expenses={expenses} />
      </Box>
      {expenses.length === 0 ? (
        <Typography variant="h6" align="center">
          Brak wydatków
        </Typography>
      ) : (
        <ExpenseTable data={expenses} setExpenses={setExpenses} />
      )}
    </Box>
  );
}

export default Homepage;
