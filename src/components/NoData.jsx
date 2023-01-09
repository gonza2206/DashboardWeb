import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";


const NoData = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            //borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="55px"
        >
            <Typography
                variant="h5"
                fontWeight="bold"
                color={colors.redAccent[400]}
            >
                NO DATA HAS BEEN FOUND!<br/><br/>
                ---Please select other date---
            </Typography>
        </Box>
    );
}

export default NoData;
