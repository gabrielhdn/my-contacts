import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';

import * as S from './styles';
import Header from '../Header';
import Router from '../../Router';
import ToastContainer from '../Toast/ToastContainer';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <ToastContainer />

        <S.Container>
          <Header />
          <Router />
        </S.Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
