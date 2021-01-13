import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#191919'
    },
    secondary: {
      main: '#2f9085'
    },
    // error: {
    //   main: red.A400
    // },
    background: {
      default: '#313030',
      paper: '#413f3f'
    }
  },
  overrides: {
    MuiCardHeader: {
      action: {
        alignSelf: 'center'
      }
    }
  }
});
