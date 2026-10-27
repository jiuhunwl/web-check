import { BrowserRouter } from 'react-router';
import { I18nProvider } from './i18n.tsx';
import App from './App.tsx';

export default () => (
  <I18nProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </I18nProvider>
);
