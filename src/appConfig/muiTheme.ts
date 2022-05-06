import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#f05122',
    },
    secondary: {
      main: '#337ab7',
    },
  },
});

export const muiResponsive = {
  MOBILE: '(max-width:600px)',
  TABLET: '(max-width:960px)',
  MEDIUM_DESKTOP: '(max-width:1280px)',
  LARGE_DESKTOP: '(max-width:1440px)',
};
