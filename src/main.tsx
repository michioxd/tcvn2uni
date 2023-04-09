import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ThemeMode from './utils/ThemeMode'
import { CssBaseline } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

    <BrowserRouter>
        <SnackbarProvider autoHideDuration={5000}>
            <ThemeMode>
                <CssBaseline enableColorScheme={true} />
                <App />
            </ThemeMode>
        </SnackbarProvider>
    </BrowserRouter>
    ,
)
