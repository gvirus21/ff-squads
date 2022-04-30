import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

 

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#EDF2F7',
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: '#1a202c',
    },
  },
  typography: {
      fontFamily: 'Helvetica',
    h4: {
      fontSize: 24,
    },
    h5: {
      fontSize: 20,
    },
    h6: {
      fontSize: 18,
    },
      font12: {
          fontSize: 12,
      },
      font16: {
      fontSize: 16,
    },
    font18: {
        fontSize: 18,
      },
      font40: {
          fontSize: 40,
      },
  },
  components: {
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
          color: '#1a202c',
        },
        asterisk: {
          color: '#E53E3E',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#1a202c',
        },
        asterisk: {
          color: '#E53E3E',
        },
      },
      },
      
  },
});

 
 
export default theme;
