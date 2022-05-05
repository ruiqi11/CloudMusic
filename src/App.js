import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import { HashRouter } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config'
import Routes from './routes';

function App() {
  return (
    <HashRouter>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      <Routes/>
    </HashRouter>
  );
}

export default App;
