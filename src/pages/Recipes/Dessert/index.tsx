import Posts from '../../../components/posts/Posts';

import styles from '../recipes.module.css';

import { RecipeData } from '../../../interfaces/interface';
import Sort from '../../../components/sort/Sort';

interface Dessert_Recipes {
  dessertRecipes: RecipeData[];
  addToFavorite: (id: number) => void;
  removeFromFavorite: (id: number) => void;
  bookmarked: number[];
}

export default function Dessert(props: Dessert_Recipes) {
  const categories: string[] = ['Lunch', 'Dinner', 'Sides', 'Dessert'];
  props.dessertRecipes.map((item) => {
    return item.categories.filter((item2) => {
      const isDuplicate = categories.includes(item2);

      if (!isDuplicate) {
        categories.push(item2);
        return true;
      }

      return false;
    });
  });
  return (
    <main>
      <header className={styles.test_header}>
        <h3>Dessert Recipes</h3>
        <Sort category={categories} />
      </header>

      <Posts
        addToFavorite={props.addToFavorite}
        removeFromFavorite={props.removeFromFavorite}
        bookmarked={props.bookmarked}
        posts={props.dessertRecipes}
      />
    </main>
  );
}
