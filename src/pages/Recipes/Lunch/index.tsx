import Posts from '../Posts';
import SearchBar from '../../../components/search_bar/SearchBar';

import '../recipes.css';

import { RecipeData } from '../../../interfaces/interface';

interface Lunch_Recipes {
  lunchRecipes: RecipeData[];
}

export default function Lunch(props: Lunch_Recipes) {
  console.log(props.lunchRecipes);
  return (
    <main>
      <header className='test-header'>
        <h3>Lunch Recipes</h3>
        <SearchBar />
      </header>

      <Posts posts={props.lunchRecipes} />
    </main>
  );
}
