import Posts from '../Posts';
import SearchBar from '../../../components/search_bar/SearchBar';
import { RecipeData } from '../../../interfaces/interface';

import '../recipes.css';

interface Dinner_Recipes {
  dinnerRecipes: RecipeData[];
}
export default function Dinner(props: Dinner_Recipes) {
  return (
    <main>
      <header className='test-header'>
        <h3>Dinner Recipes</h3>
        <SearchBar />
      </header>

      <Posts posts={props.dinnerRecipes} />
    </main>
  );
}
