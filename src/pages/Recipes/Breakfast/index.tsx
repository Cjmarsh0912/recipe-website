import { RecipeData } from '../../../interfaces/interface';

interface Breakfast_Recipes {
  breakfastRecipes: RecipeData[];
}

export default function Breakfast(props: Breakfast_Recipes) {
  console.log(props.breakfastRecipes);
  return (
    <main>
      <h3>Breakfast</h3>
    </main>
  );
}
