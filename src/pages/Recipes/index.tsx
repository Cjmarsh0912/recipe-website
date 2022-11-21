import Posts from '../../components/posts/Posts';

import { RecipeData } from '../../interfaces/interface';
import Sort from '../../components/sort/Sort';

import styles from './recipes.module.css';

interface AllRecipes {
  recipes: RecipeData[];
  addToFavorite: (id: number) => void;
  removeFromFavorite: (id: number) => void;
  bookmarked: number[];
}

export default function Recipes(props: AllRecipes) {
  const categories: string[] = ['Lunch', 'Dinner', 'Sides', 'Dessert'];
  props.recipes.map((item) => {
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
        <h3>All recipes</h3>
        <Sort category={categories} />
      </header>

      <Posts
        addToFavorite={props.addToFavorite}
        removeFromFavorite={props.removeFromFavorite}
        bookmarked={props.bookmarked}
        posts={props.recipes}
      />
    </main>
  );
}
