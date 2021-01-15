import React from 'react';
import ReactDom from 'react-dom';
import { AppComponent } from './App';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import { CssBaseline } from '@material-ui/core';

const state = window.__STATE__;

function Main() {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppComponent state={state} />
    </ThemeProvider>
  );
}

ReactDom.hydrate(<Main />, document.getElementById('root'));
