import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';

import { config } from '../config';
import { theme } from '../../app/theme';
import { AppComponent } from '../../app/App';

import { Environment } from '../../types/environment';
import { AppState } from '../../types/state';

const { env } = config;

export const getBundleLocation = (env: Environment) =>
  env === Environment.DEVELOPMENT
    ? 'http://localhost:3000/index.js'
    : 'index.js';

export const getHtmlHead = (serverSideCss: string) =>
  `<!DOCTYPE html><html><head><title>POWR</title><meta name="viewport" content="width=device-width, initial-scale=1"><style>${getCssReset()}</style><style id="jss-server-side">${serverSideCss}</style></head><body><div id='root'>`;

export const getHtmlFooter = (state: AppState, env: Environment) =>
  `</div></body><script>window.__STATE__=${JSON.stringify(
    state
  )}</script><script src="${getBundleLocation(env)}"></script></html>`;

export const getCssReset = () =>
  `a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}`;

export const renderApp = (state: AppState) => {
  const sheets = new ServerStyleSheets();
  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <AppComponent state={state} />
      </ThemeProvider>
    )
  );
  const serverSideCss = sheets.toString();
  return `${getHtmlHead(serverSideCss)}${html}${getHtmlFooter(state, env)}`;
};
