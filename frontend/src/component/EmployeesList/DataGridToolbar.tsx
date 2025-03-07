// import { Box } from "@mui/material";
// import {
//   GridToolbarContainer,
//   GridToolbarExport,
//   GridToolbarFilterButton,
//   GridToolbarQuickFilter,
// } from "@mui/x-data-grid";
// import React from "react";

// const DataGridToolbar = () => {
//   return (
//     <GridToolbarContainer sx={{ display: "flex", gap: 10 }}>
//       <GridToolbarExport />
//       <GridToolbarFilterButton />
//       <GridToolbarQuickFilter />
//     </GridToolbarContainer>
//   );
// };

// export default DataGridToolbar;

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
    <GridToolbarContainer
      sx={{
        display: "flex",
        flexDirection: { xs: "row", sm: "row" },
        gap: { xs: 2, sm: 10 },
        alignItems: "start",
        width: "100%",
        p: { xs: 1, sm: 2 },
      }}
    >
      <GridToolbarExport />
      <GridToolbarFilterButton />
      <GridToolbarQuickFilter sx={{ flexGrow: 1 }} />{" "}
    </GridToolbarContainer>
  );
};

export default DataGridToolbar;
