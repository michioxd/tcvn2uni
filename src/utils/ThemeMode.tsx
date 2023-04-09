import { ThemeProvider, createTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

const ColorModeContext = React.createContext({ themeToggle: () => { }, themeMode: 'light' });

export default function ThemeMode({ children }: { children: JSX.Element | JSX.Element[] }) {
    const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'auto'>(window.localStorage.getItem('themeMode') === 'dark' ? 'dark' :
        window.localStorage.getItem('themeMode') === 'light' ?
            'light' : 'auto');

    const [mode, setMode] = React.useState<'light' | 'dark'>('light');

    const toggleColor = React.useCallback(() => {
        const getThemeFromStorage = window.localStorage.getItem('themeMode');
        if (getThemeFromStorage === 'dark') {
            setThemeMode('auto');
            window.localStorage.removeItem('themeMode');
        } else if (getThemeFromStorage === 'light') {
            setThemeMode('dark');
            window.localStorage.setItem('themeMode', 'dark');
        } else {
            setThemeMode('light');
            window.localStorage.setItem('themeMode', 'light');
        }
    }, []);

    const valueTheme: {
        themeMode: 'light' | 'dark' | 'auto',
        themeToggle: () => void
    } = {
        themeMode: themeMode,
        themeToggle: toggleColor
    }

    const theme = React.useMemo(() =>
        createTheme({
            palette: {
                mode,
            },
        }), [mode],);

    useEffect(() => {
        if (themeMode === 'dark') {
            setMode('dark');
            document.documentElement.setAttribute('theme', 'dark');
        } else if (themeMode === 'light') {
            setMode('light');
            document.documentElement.setAttribute('theme', 'light');
        } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setMode('dark');
                document.documentElement.setAttribute('theme', 'dark');
            } else {
                setMode('light');
                document.documentElement.setAttribute('theme', 'light');
            }
        }
    }, [themeMode]);

    React.useEffect(() => {
        const themeChanger = () => {
            if (window.localStorage.getItem('themeMode') !== 'dark' || window.localStorage.getItem('themeMode') !== 'light') {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    setMode('dark');
                    document.documentElement.setAttribute('theme', 'dark');
                } else {
                    setMode('light');
                    document.documentElement.setAttribute('theme', 'light');
                }
            }
        }

        const mql = window.matchMedia("(prefers-color-scheme: dark)");
        mql.addEventListener('change', themeChanger);

        return () => {
            mql.removeEventListener('change', themeChanger);
        }
    }, []);

    return (
        <ColorModeContext.Provider value={valueTheme}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export const useThemeMode = () => {
    return React.useContext(ColorModeContext);
}