import { Timestamp } from "firebase/firestore";

export interface NewExpense {
  amount: number;
  category: string;
  description: string;
  date: Timestamp;
}

export interface Expense extends NewExpense {
  id: string;
}

export interface ExpenseSummary {
  [category: string]: {
    name: string;
    value: number;
  };
}
