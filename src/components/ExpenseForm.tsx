import React, { useState } from "react";
import { NewExpense } from "../types/Expense.ts";
import { Timestamp } from "firebase/firestore";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import CategorySelect from "./CategorySelect.tsx";
import AddIcon from "@mui/icons-material/Add";

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "300px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Dodaj nowy wydatek
        </Typography>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
            maxWidth: "300px",
          }}
        >
          <TextField
            required
            type="number"
            id="amount-input"
            label="Kwota"
            placeholder="Podaj kwotę"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
          <CategorySelect
            selectedCategory={category}
            onSelectCategory={(e) => setCategory(e.target.value)}
          />
          <TextField
            required
            id="description-input"
            label="Opis"
            placeholder="Opis"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <Button type="submit" startIcon={<AddIcon />} variant="outlined">
          Dodaj wydatek
        </Button>
      </Box>
    </form>
  );
}
