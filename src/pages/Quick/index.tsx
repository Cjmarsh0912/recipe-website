import Posts from '../../components/posts/Posts';

import styles from '../../pages/Recipes/recipes.module.css';

import { RecipeData } from '../../interfaces/interface';

import Sort from '../../components/sort/Sort';

interface Quick_Recipes {
  quickRecipes: RecipeData[];
  addToFavorite: (id: number) => void;
  removeFromFavorite: (id: number) => void;
  bookmarked: number[];
}

export default function Quick(props: Quick_Recipes) {
  const categories: string[] = ['Lunch', 'Dinner', 'Sides', 'Dessert'];
  props.quickRecipes.map((item) => {
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
        <h3>30 Minutes or less</h3>
        <Sort category={categories} />
      </header>

      <Posts
        addToFavorite={props.addToFavorite}
        removeFromFavorite={props.removeFromFavorite}
        bookmarked={props.bookmarked}
        posts={props.quickRecipes}
      />
    </main>
  );
}
