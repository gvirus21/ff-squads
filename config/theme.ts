import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

 

// Create a theme instance.
const theme = createTheme({
    palette: {
    mode : 'light',
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
    background: {
        default: '#FCFDF0'
    }
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
