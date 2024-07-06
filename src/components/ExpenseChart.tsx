import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Expense, ExpenseSummary } from "../types/Expense.ts";

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
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const formatTooltipValue = (value: number, name: string) => {
    return [`${name}: ${value} PLN`];
  };

  return (
    <PieChart width={600} height={300}>
      <Pie
        dataKey="value"
        data={data}
        cx={300}
        cy={150}
        outerRadius={80}
        fill="#8884d8"
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
            name={entry.name}
          />
        ))}
      </Pie>
      <Tooltip formatter={formatTooltipValue} />
    </PieChart>
  );
}
