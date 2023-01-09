import { Box, IconButton, InputBase, useTheme } from '@mui/material';
import { tokens, ColorModeContext } from '../../theme';
import LighModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import React from 'react';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/*Search Bat */}
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >

                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search"></InputBase>
                <IconButton type='button' sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode} type='button' sx={{ p: 1 }}>
                    {theme.palette.mode === 'dark' ?
                        (<DarkModeOutlinedIcon />) :
                        (<LighModeOutlinedIcon />)}
                </IconButton>

                <IconButton type='button' sx={{ p: 1 }}>
                    <NotificationsOutlinedIcon />
                </IconButton>

                <IconButton type='button' sx={{ p: 1 }}>
                    <SettingsOutOutlinedIcon />
                </IconButton>

                <IconButton type='button' sx={{ p: 1 }}>
                    <PersonOutlinedIcon />
                </IconButton>

            </Box>

        </Box>
    );
}

export default Topbar;
