import { AppBar, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { useState } from 'react';
import { Link, Link as LinkRoute } from 'react-router-dom';
import { useThemeMode } from './../utils/ThemeMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';
import BrightnessMediumIcon from '@mui/icons-material/BrightnessMedium';

export default function Header() {
    const { themeToggle, themeMode } = useThemeMode();
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" component={Link} color="inherit" to={'/'} sx={{ flexGrow: 1, width: 'fit-content' }}>
                    tcvn2uni
                </Typography>
                <Button sx={{ mr: 2, width: 'fit-content' }} color="inherit" component={LinkRoute} to="/text">Chuyển văn bản</Button>
                <Tooltip title={"Thay đổi chủ đề: " + (themeMode === 'dark' ? 'Tối' : themeMode === 'light' ? 'Sáng' : 'Tự động')}>
                    <IconButton color="inherit" sx={{ mr: 1 }} onClick={themeToggle} aria-label="theme toggle">
                        {
                            themeMode === 'dark' ? (
                                <NightsStayIcon />
                            ) : themeMode === 'light' ? (
                                <LightModeIcon />
                            ) : (
                                <BrightnessMediumIcon />
                            )
                        }
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    )
}