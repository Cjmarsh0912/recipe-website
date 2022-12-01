import { useEffect } from 'react';

import Posts from '../../components/posts/Posts';

import { RecipeData } from '../../interfaces/interface';
import Sort from '../../components/sort/Sort';

import styles from './recipes.module.css';

interface AllRecipes {
  recipes: RecipeData[];
  addToFavorite: (id: number) => void;
  removeFromFavorite: (id: number) => void;
  bookmarked: number[];
  setType: (test: any) => void;
  categories: string[];
  testFunction: (testData: RecipeData[]) => void;
}

export default function Recipes(props: AllRecipes) {
  useEffect(() => {
    props.testFunction(props.recipes);
  }, []);
  return (
    <main>
      <header className={styles.test_header}>
        <h3>All recipes</h3>
        <Sort setType={props.setType} category={props.categories} />
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
