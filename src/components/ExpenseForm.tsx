import React, { useState } from "react";
import { NewExpense } from "../types/Expense.ts";
import { Timestamp } from "firebase/firestore";
import { Button, TextField } from "@mui/material";

interface ExpenseFormProps {
  addExpense: (expense: NewExpense) => void;
}

export function ExpenseForm({ addExpense }: ExpenseFormProps) {
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addExpense({ amount, category, description, date: Timestamp.now() });
    setAmount(0);
    setCategory("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        required
        type="number"
        id="amount-input"
        label="Kwota"
        defaultValue="0"
        placeholder="Podaj kwotę"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
      />
      <TextField
        required
        id="category-input"
        label="Kategoria"
        placeholder="Kategoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <TextField
        required
        id="description-input"
        label="Opis"
        placeholder="Opis"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button type="submit">Dodaj wydatek</Button>
    </form>
  );
}
