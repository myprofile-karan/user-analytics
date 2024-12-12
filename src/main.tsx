import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store/store';
import ThemeProvider from "./theme/index.tsx";        
import App from './App.tsx';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <CssBaseline /> {/* Normalize CSS */}
      <App />
      </ThemeProvider>
  </Provider>
);
