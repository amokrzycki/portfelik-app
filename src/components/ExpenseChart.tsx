import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Expense, ExpenseSummary } from "../types/Expense.ts";
import { colors } from "../constans/colors.ts";
import { Box, Typography } from "@mui/material";
import useIsMobile from "../hooks/useIsMobile.ts";

interface ExpenseChartProps {
  expenses: Expense[];
}

const aggregateExpensesByCategory = (expenses: Expense[]): ExpenseSummary => {
  return expenses.reduce<ExpenseSummary>((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category].value += expense.amount;
    } else {
      acc[expense.category] = {
        name: expense.category,
        value: expense.amount,
      };
    }
    return acc;
  }, {});
};
const prepareChartData = (
  expenses: Expense[],
): { name: string; value: number }[] => {
  const aggregatedData = aggregateExpensesByCategory(expenses);
  return Object.values(aggregatedData);
};

export function ExpenseChart({ expenses }: ExpenseChartProps) {
  const data = prepareChartData(expenses);
  const isMobile = useIsMobile();

  const formatTooltipValue = (value: number, name: string) => {
    return [`${name}: ${value} PLN`];
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px 0",
        width: "100%",
      }}
    >
      <Typography variant="h5">Wykres kołowy wydatków</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius="80%"
            fill="#8884d8"
            label={({ name, percent }) =>
              `${isMobile ? "" : name} ${(percent * 100).toFixed(1)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                name={entry.name}
              />
            ))}
          </Pie>
          {isMobile ? (
            <Legend
              iconType="circle"
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          ) : null}
          <Tooltip formatter={formatTooltipValue} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
