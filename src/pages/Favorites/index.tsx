import Posts from '../../components/posts/Posts';

import styles from '../../pages/Recipes/recipes.module.css';

import { RecipeData } from '../../interfaces/interface';

import Sort from '../../components/sort/Sort';

interface Favorites {
  favorites: RecipeData[];
  addToFavorite: (id: number) => void;
  removeFromFavorite: (id: number) => void;
  bookmarked: number[];
}

export default function Favorites(props: Favorites) {
  const categories: string[] = ['Lunch', 'Dinner', 'Sides', 'Dessert'];
  props.favorites.map((item) => {
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
        <h3>Favorites</h3>
        <Sort category={categories} />
      </header>

      <Posts
        addToFavorite={props.addToFavorite}
        removeFromFavorite={props.removeFromFavorite}
        bookmarked={props.bookmarked}
        posts={props.favorites}
      />
    </main>
  );
}
