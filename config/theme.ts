import { createTheme } from '@mui/material/styles'

 

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
        main: '#8C79E2',
    },
    secondary: {
      main: '#e5ece3',
    },
    success: {
      main: '#CDFCB1',
    },
    info: {
      main: '#8C79E2',
    },
    text: {
      primary: '#F5FFF4',
      secondary: '#bac3b9',
       
    },
    background: {
      default: '#11151f',
    },
  },
  typography: {
    fontFamily: 'Karla',
    fontWeightMedium: 400,
    h3: {
      fontSize: 40,
      lineHeight: '56px',
    },
    h4: {
      fontSize: 24,
    },
    h5: {
      fontSize: 20,
    },
    h6: {
      fontSize: 18,
      lineHeight: '28px',
    },
    body1: {
      fontSize: 16,
      lineHeight: '24px',
    },
    body2: {
      fontSize: 14,
      lineHeight: '24px',
    },
    caption: {
      fontSize: 12,
      lineHeight: '18px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 16,
          boxShadow: '0px 2px 6px 0px rgba(255, 255, 255, 0.25)',
          fontWeight: 500,
        },
        containedSecondary: {
          background: '#F5FFF4',
          color: '#11151f',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#11151F',
          boxShadow: '4px 10px 35px 0px rgba(245, 255, 244, 0.2)',
          borderRadius: '6px',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: 29,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 29,
          paddingTop: 0,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '14px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        animated: {
          color: '#F5FFF4',
        },
        asterisk: {
          color: '#E53E3E',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#F5FFF4',
          '&.Mui-focused': {
            color: '#F5FFF4',
          },
        },
        asterisk: {
          color: '#E53E3E',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: '#11151f',
        },
      },
    },
  },
})


export default theme;

