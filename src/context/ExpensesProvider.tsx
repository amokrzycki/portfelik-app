import React, { createContext, useContext, useState, ReactNode } from "react";
import { Expense } from "../types/Expense.ts";

interface ExpensesContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  addExpense: (expense: Expense) => void;
}

const ExpensesContext = createContext<ExpensesContextType | undefined>(
  undefined,
);

export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error("useExpenses must be used within a ExpensesProvider");
  }
  return context;
};

interface ExpensesProviderProps {
  children: ReactNode;
}

export const ExpensesProvider: React.FC<ExpensesProviderProps> = ({
  children,
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  return (
    <ExpensesContext.Provider value={{ expenses, setExpenses, addExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
};
