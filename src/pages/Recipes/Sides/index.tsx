import Posts from '../Posts';
import SearchBar from '../../../components/search_bar/SearchBar';

import '../recipes.css';

import { RecipeData } from '../../../interfaces/interface';

interface Side_Recipes {
  sideRecipes: RecipeData[];
}

export default function Breakfast(props: Side_Recipes) {
  return (
    <main>
      <header className='test-header'>
        <h3>Side Recipes</h3>
        <SearchBar />
      </header>

      <Posts posts={props.sideRecipes} />
    </main>
  );
}
