import { Toolbar, Typography, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ExpenseTableToolbarProps {
  numSelected: number;
  onDelete: () => void;
}

function ExpenseTableToolbar({
  numSelected,
  onDelete,
}: ExpenseTableToolbarProps) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.background.paper
              : theme.palette.background.paper,
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected}{" "}
          {numSelected === 1 ? "wydatek zaznaczony" : "wydatki zaznaczone"}
        </Typography>
      ) : (
        <Typography variant="h6" id="tableTitle" component="div">
          Lista wydatków
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}

export default ExpenseTableToolbar;
