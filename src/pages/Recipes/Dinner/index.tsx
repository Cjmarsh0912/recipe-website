import Posts from '../../../components/posts/Posts';
import { RecipeData } from '../../../interfaces/interface';

import styles from '../recipes.module.css';
import Sort from '../../../components/sort/Sort';

interface Dinner_Recipes {
  dinnerRecipes: RecipeData[];
  addToFavorite: (id: number) => void;
  removeFromFavorite: (id: number) => void;
  bookmarked: number[];
}
export default function Dinner(props: Dinner_Recipes) {
  const categories: string[] = [];
  props.dinnerRecipes.map((item) => {
    return item.categories.filter((item2) => {
      const isDuplicate = categories.includes(item2);

      if (!isDuplicate && item2 !== 'Dinner') {
        categories.push(item2);
        return true;
      }

      return false;
    });
  });
  return (
    <main>
      <header className={styles.test_header}>
        <h3>Dinner Recipes</h3>
        <Sort category={categories} />
      </header>

      <Posts
        addToFavorite={props.addToFavorite}
        removeFromFavorite={props.removeFromFavorite}
        bookmarked={props.bookmarked}
        posts={props.dinnerRecipes}
      />
    </main>
  );
}
