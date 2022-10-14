import Navbar from './components/Navbar';
import Home from './pages/Home/';

import Recipes from './pages/Recipes/';
import Breakfast from './pages/Recipes/Breakfast/';
import Lunch from './pages/Recipes/Lunch/';
import Dinner from './pages/Recipes/Dinner/';

import Quick from './pages/Quick/';
import MostRecent from './pages/Most-Recent/';
import Favorites from './pages/Favorites/';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './assets/App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='wrapper'>
          <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/all-recipes' element={<Recipes />} />
            <Route path='/breakfast-recipes' element={<Breakfast />} />
            <Route path='/lunch-recipes' element={<Lunch />} />
            <Route path='/dinner-recipes' element={<Dinner />} />

            <Route path='/quick-recipes' element={<Quick />} />
            <Route path='/most-recent-recipes' element={<MostRecent />} />
            <Route path='/favorites' element={<Favorites />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
