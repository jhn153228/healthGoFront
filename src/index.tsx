import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Root from './pages';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>
);
