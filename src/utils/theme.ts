import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { red } from '@material-ui/core/colors';

const breakpoints = createBreakpoints({});

// breakpoints.values.lg = 1024
// breakpoints.values['xxl'] = 3000
// '@media (min-width:600px)': {
//     fontSize: '1.5rem',
//   },

// Create a theme instance.
let theme = createMuiTheme({
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
  // typography: {
  //   fontSize: 14,
  // },
  typography: {
    fontFamily: [
      'Roboto Condensed',
      'Roboto',
      'sans-serif',
      // 'Rubik',
      'Oswald',
      // 'Raleway',
    ].join(','),

    h4: {
      fontSize: '2.125rem',
      [breakpoints.down('sm')]: {
        fontSize: '1.5rem',
      },
    },
    subtitle2: {
      fontSize: '0.875rem',
      [breakpoints.down('sm')]: {
        fontSize: '0.65rem',
      },
    },
    body2: {
      fontSize: '0.875rem',
      [breakpoints.down('sm')]: {
        fontSize: '0.65rem',
      },
    },
  },
  overrides: {
    MuiIconButton: {
      root: {
        [breakpoints.down('sm')]: {
          padding: 0,
          paddingLeft: 1,
        },
      },
    },
    MuiTablePagination: {
      selectRoot: {
        [breakpoints.down('sm')]: {
          marginLeft: 0,
          marginRight: 5,
        },
      },
    },
    MuiToolbar: {
      regular: {
        [breakpoints.down('sm')]: {
          paddingTop: '0.5rem',
          minHeight: 0,
        },
      },
    },
  },
});

// theme.typography.subtitle2 = {
//   fontSize: '0.875rem',
//   [theme.breakpoints.down('sm')]: {
//     fontSize: '0.65rem',
//   },
// };

theme = responsiveFontSizes(theme);
// fontFamily: ['Raleway', 'Lobster', 'sans-serif'].join(','),

// theme.typography.h4 = {
//   fontSize: 12,
//   [theme.breakpoints.up('sm')]: {
//     fontSize: 15,
//   },
// [theme.breakpoints.up('md')]: {
//   fontSize: 12,
// },
// [theme.breakpoints.up('lg')]: {
//   fontSize: 12,
// },
//};

export default theme;
