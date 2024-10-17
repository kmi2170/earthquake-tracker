'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { Oswald, Roboto_Condensed } from 'next/font/google';

export const oswald = Oswald({
  subsets: ['latin'],
  style: 'normal',
  weight: ['400', '700'],
  display: 'swap',
});

export const roboto = Roboto_Condensed({
  subsets: ['latin'],
  style: 'normal',
  weight: ['400', '700'],
  display: 'swap',
});

let theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: oswald.style.fontFamily,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
