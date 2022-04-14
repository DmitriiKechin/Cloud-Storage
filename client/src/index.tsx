import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';
import { AuthPage } from './pages/AuthPage';
import { StoragePage } from './pages/StoragePage';
import adaptiveSize from './global_Function/adaptiveSize';
import { Provider } from 'react-redux';
import { store } from './store';

const Global = createGlobalStyle`
html{
	font-size: ${adaptiveSize({
    minSize: '16px',
    maxSize: '25px',
    minWidth: '320px',
    maxWidth: '1100px',
  })};

@media ${(props) => props.theme.media.desktop}{
font-size: 25px;
}

*{		
	margin: 0;
	padding: 0;
	box-sizing: border-box;


	}}
`;

export const theme: DefaultTheme = {
  colors: {
    accent: '#FCF201',
    darkPrimary: '#082340',
    darkSecondary: '#6f63ad',
    lightPrimary: '#FFFFFF',
    lightSecondary: '#F3F3F3',
  },
  sizes: {
    wrapper: '1100px',
  },
  media: {
    mobile: '(max-width: 700px)',
    desktop: '(min-width: 1100px)',
  },
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global />
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <App storagePage={<StoragePage />} authPage={<AuthPage />} />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

console.log('web app render');
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
