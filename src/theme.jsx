import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF8354', 
    },
    secondary: {
      main: '#E7FF8F',
    },
    background: {
      default: '#2B2B2B',
    },
    text: {
      primary: '#FFFFFF', 
    },
  },
  typography: {
    fontFamily: 'Montserrat', 
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', 
        },
      },
    },
  },
});

export default theme;
