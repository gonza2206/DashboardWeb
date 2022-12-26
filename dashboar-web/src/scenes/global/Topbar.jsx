import { Box, IconButton,InputBase,useTheme } from '@mui/material';
import { ColorModeContext, tokens } from '../../theme';
import LighModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationOutlinedIcon from '@mui/icons-material/NotificationOutlined';
import SettingOutOutlinedIcon from '@mui/icons-material/SettingOutOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { useContext} from 'react';
import React from 'react';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    return (
        <Box display="flex" justifyContent="space-between" p={2}>
           {/*Search Bat */}
           <Box></Box>
            <IconButton></IconButton>
        </Box>
    );
}

export default Topbar;
