import { Box } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import React from "react";

const DataGridToolbar = () => {
  return (
    <GridToolbarContainer sx={{ display: "flex", gap: 10 }}>
      <GridToolbarExport />
      <GridToolbarFilterButton />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

export default DataGridToolbar;
