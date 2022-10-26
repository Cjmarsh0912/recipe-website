import { RecipeData } from '../../../interfaces/interface';

interface Dessert_Recipes {
  dessertRecipes: RecipeData[];
}

export default function Dessert(props: Dessert_Recipes) {
  console.log(props.dessertRecipes);
  return (
    <main>
      <h3>Dessert</h3>
    </main>
  );
}
