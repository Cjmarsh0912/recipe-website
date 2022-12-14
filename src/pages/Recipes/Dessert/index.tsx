import Posts from '../../../components/posts/Posts';

import styles from '../recipes.module.css';

import { RecipeData } from '../../../interfaces/interface';
import Sort from '../../../components/sort/Sort';

interface Dessert_Recipes {
  dessertRecipes: RecipeData[];
  addToFavorite: (id: number) => void;
  removeFromFavorite: (id: number) => void;
  bookmarked: number[];
  setType: (test: any) => void;
  categories: string[];
}

export default function Dessert(props: Dessert_Recipes) {
  const categories: string[] = [];
  props.dessertRecipes.map((item) => {
    return item.categories.filter((item2) => {
      const isDuplicate = categories.includes(item2);

      if (!isDuplicate && item2 !== 'Dessert' && item2 !== 'No Meat') {
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
        <Sort setType={props.setType} category={props.categories} />
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
