import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ffff',
    },
    background: {
      default: '#101010',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
