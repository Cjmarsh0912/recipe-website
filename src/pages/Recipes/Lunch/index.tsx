import Posts from '../../../components/posts/Posts';

import styles from '../recipes.module.css';

import { RecipeData } from '../../../interfaces/interface';
import Sort from '../../../components/sort/Sort';

interface Lunch_Recipes {
  lunchRecipes: RecipeData[];
  addToFavorite: (id: number) => void;
  removeFromFavorite: (id: number) => void;
  bookmarked: number[];
}

export default function Lunch(props: Lunch_Recipes) {
  const categories: string[] = [];
  props.lunchRecipes.map((item) => {
    return item.categories.filter((item2) => {
      const isDuplicate = categories.includes(item2);

      if (!isDuplicate && item2 !== 'Lunch') {
        categories.push(item2);
        return true;
      }

      return false;
    });
  });
  return (
    <main>
      <header className={styles.test_header}>
        <h3>Lunch Recipes</h3>
        <Sort category={categories} />
      </header>

      <Posts
        addToFavorite={props.addToFavorite}
        removeFromFavorite={props.removeFromFavorite}
        bookmarked={props.bookmarked}
        posts={props.lunchRecipes}
      />
    </main>
  );
}
