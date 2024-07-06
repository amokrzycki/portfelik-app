import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Category } from "../enums/Category.ts";

interface CategorySelectProps {
  selectedCategory: string;
  onSelectCategory: (event: SelectChangeEvent) => void;
}

function CategorySelect({
  selectedCategory,
  onSelectCategory,
}: CategorySelectProps) {
  return (
    <FormControl
      sx={{
        width: "100%",
        gap: "20px",
      }}
    >
      <InputLabel id="category-select-label">Kategoria</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={selectedCategory}
        label="Kategoria"
        onChange={onSelectCategory}
        sx={{ width: "100%" }}
      >
        {Object.entries(Category).map(([key, value]) => (
          <MenuItem key={key} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CategorySelect;
