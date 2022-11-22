import Posts from '../../../components/posts/Posts';

import styles from '../recipes.module.css';

import { RecipeData } from '../../../interfaces/interface';
import Sort from '../../../components/sort/Sort';

interface Side_Recipes {
  sideRecipes: RecipeData[];
  addToFavorite: (id: number) => void;
  removeFromFavorite: (id: number) => void;
  bookmarked: number[];
}

export default function Breakfast(props: Side_Recipes) {
  const categories: string[] = [];
  props.sideRecipes.map((item) => {
    return item.categories.filter((item2) => {
      const isDuplicate = categories.includes(item2);

      if (!isDuplicate && item2 !== 'Sides') {
        categories.push(item2);
        return true;
      }

      return false;
    });
  });
  return (
    <main>
      <header className={styles.test_header}>
        <h3>Side Recipes</h3>
        <Sort category={categories} />
      </header>

      <Posts
        addToFavorite={props.addToFavorite}
        removeFromFavorite={props.removeFromFavorite}
        bookmarked={props.bookmarked}
        posts={props.sideRecipes}
      />
    </main>
  );
}
