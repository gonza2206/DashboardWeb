import React, { useContext } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import { dateToggleContext } from "../../provider/DateContext";
const Spaces = () => {
  
  const theme = useTheme();
  const { updateFloorValue } = useContext(dateToggleContext);
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headername: "id" },
    { field: "Piso", headername: "id" },
    { field: "Direccion", headername: "Name", flex: 0.5, cellClassName: "name-column--cell" },
    { field: "Aclaracion", headername: "Direction", cellClassName: "name-column--cell" },
  ]
  const [selectedId, setSelectedId] = React.useState(null);

  const getRowID = (row) => {
    const id = row.id;
    setSelectedId(selectedId === id ? null : id);
    updateFloorValue(id);
  }

  return (
    <Box m="20px">
      <Header title="SPACES" subtitle="Managing the Spaces" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{//Damos estilos a la tabla obteniendo las clases de la inspeccion de la pagina

          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection={true} rows={mockDataTeam} columns={columns} onCellClick={getRowID} selectedId={selectedId} />{/*Los datos obtenidos de rows tienen que venir de la base de datos */}
      </Box>
    </Box>
  );
}

export default Spaces;
