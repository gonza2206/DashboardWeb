import React from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Spaces = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "Piso", headername: "ID" }, 
        { field: "Espacio", headername: "Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "Consumo[kwh]", headername: "Age", type: "number", cellClassName: "name-column--cell" },
        { field: "Direccion", headername: "Direction", type: "String", cellClassName: "name-column--cell" },
    ]

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
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />{/*Los datos obtenidos de rows tienen que venir de la base de datos */}
      </Box>
    </Box>
    );
}

export default Spaces;
