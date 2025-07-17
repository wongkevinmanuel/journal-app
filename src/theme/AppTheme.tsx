import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import React from 'react'

import supermanTheme from './supermanTheme';

interface appThemeProps{
    children: React.ReactNode,
}

export const AppTheme = ({children}:appThemeProps) => {
  return (
    <ThemeProvider theme={ supermanTheme }>
        <CssBaseline/>
        {children}
    </ThemeProvider>
  )
}
