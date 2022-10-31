import Posts from '../Posts';
import SearchBar from '../../../components/search_bar/SearchBar';

import '../recipes.css';

import { RecipeData } from '../../../interfaces/interface';

interface Dessert_Recipes {
  dessertRecipes: RecipeData[];
}

export default function Dessert(props: Dessert_Recipes) {
  return (
    <main>
      <header className='test-header'>
        <h3>Dessert Recipes</h3>
        <SearchBar />
      </header>

      <Posts posts={props.dessertRecipes} />
    </main>
  );
}