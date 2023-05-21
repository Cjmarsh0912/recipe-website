import ReactDOM from 'react-dom/client';
import App from './App';
import { RecipeProvider } from './Context/RecipeContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <RecipeProvider>
    <App />
  </RecipeProvider>
);
