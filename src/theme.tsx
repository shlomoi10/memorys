import { createTheme } from '@mui/material/styles';
import { heIL } from '@mui/material/locale';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Heebo, Alef, Arial, sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 800,
  },
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#43a047',
    },
    background: {
      default: '#f5f7fa',
      paper: '#fff',
    },
    text: {
      primary: '#212121',
      secondary: '#607d8b',
    },
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px 0 #e3eaf1',
        },
      },
    },
  },
}, heIL);

export default theme;
