import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TableSortLabel,
} from "@mui/material";
import { Expense } from "../types/Expense";
import ExpenseTableToolbar from "./ExpenseTableToolbar";
import { deleteExpenses } from "../services/budgetService";

interface EnhancedTableProps {
  data: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const headCells = [
  { id: "amount", numeric: true, label: "Kwota" },
  { id: "description", numeric: false, label: "Opis" },
  { id: "category", numeric: false, label: "Kategoria" },
  { id: "date", numeric: false, label: "Data" },
];

function ExpenseTable({ data, setExpenses }: EnhancedTableProps) {
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Expense>("date");
  const [selected, setSelected] = useState<string[]>([]);

  const handleRequestSort = (property: keyof Expense) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id.toString());
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const getComparator = (order: "asc" | "desc", orderBy: keyof Expense) => {
    return order === "desc"
      ? (a: Expense, b: Expense) =>
          b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0
      : (a: Expense, b: Expense) =>
          a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0;
  };

  const sortData = (
    array: Expense[],
    comparator: (a: Expense, b: Expense) => number,
  ) => {
    const stabilizedThis = array.map(
      (el, index) => [el, index] as [Expense, number],
    );
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const handleDelete = async () => {
    const selectedExpenses = data.filter((expense) =>
      selected.includes(expense.id.toString()),
    );
    await deleteExpenses(selectedExpenses);
    const updatedExpenses = data.filter(
      (expense) => !selected.includes(expense.id),
    );
    setExpenses(updatedExpenses);
    setSelected([]);
  };

  return (
    <TableContainer component={Paper}>
      <ExpenseTableToolbar
        numSelected={selected.length}
        onDelete={handleDelete}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < data.length
                }
                checked={data.length > 0 && selected.length === data.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                sortDirection={orderBy === headCell.id ? orderDirection : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? orderDirection : "asc"}
                  onClick={() =>
                    handleRequestSort(headCell.id as keyof Expense)
                  }
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortData(data, getComparator(orderDirection, orderBy)).map((row) => {
            const isItemSelected = isSelected(row.id.toString());
            return (
              <TableRow
                key={row.id}
                hover
                onClick={(event) => handleClick(event, row.id.toString())}
                role="checkbox"
                aria-checked={isItemSelected}
                selected={isItemSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={isItemSelected} />
                </TableCell>
                <TableCell>{row.amount} PLN</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.date.toDate().toLocaleDateString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExpenseTable;
