import Posts from '../../components/posts/Posts';

import styles from '../../pages/Recipes/recipes.module.css';

import { RecipeData } from '../../interfaces/interface';

import Sort from '../../components/sort/Sort';

interface Favorites {
  favorites: RecipeData[];
  addToFavorite: (id: number) => void;
  removeFromFavorite: (id: number) => void;
  bookmarked: number[];
  setType: (test: any) => void;
  categories: string[];
}

export default function Favorites(props: Favorites) {
  const categories: string[] = [];
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
        <Sort setType={props.setType} category={props.categories} />
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
