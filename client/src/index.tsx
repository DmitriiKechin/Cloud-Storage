import './index.css';
//import myFont from './fonts/EuphoriaScript-Regular.ttf';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { DefaultTheme } from 'styled-components';

const Global = createGlobalStyle`
*{
		font-size: 22px;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}`;

export const theme: DefaultTheme = {
  colors: {
    accent: '#FCF201',
    darkPrimary: '#082340',
    darkSecondary: '#6f63ad',
    lightPrimary: '#FFFFFF',
    lightSecondary: '#F3F3F3',
  },
  sizes: {
    wrapper: '1200px',
  },
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
