import { useEffect } from 'react';

import Posts from '../../../components/posts/Posts';

import styles from '../recipes.module.css';

import { RecipeData } from '../../../interfaces/interface';
import Sort from '../../../components/sort/Sort';

interface Side_Recipes {
  sideRecipes: RecipeData[];
  addToFavorite: (id: number) => void;
  removeFromFavorite: (id: number) => void;
  bookmarked: number[];
  setType: (test: any) => void;
  categories: string[];
  testFunction: (testData: RecipeData[]) => void;
}

export default function Breakfast(props: Side_Recipes) {
  useEffect(() => {
    props.testFunction(props.sideRecipes);
  }, []);
  return (
    <main>
      <header className={styles.test_header}>
        <h3>Side Recipes</h3>
        <Sort setType={props.setType} category={props.categories} />
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
