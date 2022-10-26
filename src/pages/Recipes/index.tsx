import Posts from './Posts';

import SearchBar from '../../components/search_bar/SearchBar';
import { RecipeData } from '../../interfaces/interface';

import './recipes.css';

interface AllRecipes {
  recipes: RecipeData[];
}

export default function Recipes(props: AllRecipes) {
  return (
    <main>
      <header className='test-header'>
        <h3>All recipes</h3>
        <SearchBar />
      </header>

      <Posts posts={props.recipes} />
    </main>
  );
}
