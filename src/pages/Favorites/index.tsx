import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import Posts from '../../components/posts/Posts';

import styles from '../../pages/Recipes/recipes.module.css';

import { PageData } from '../../interfaces/interface';

import { RecipeData } from '../../interfaces/interface';

import Sort from '../../components/sort/Sort';

// interface Favorites {
//   favorites: RecipeData[];
//   addToFavorite: (id: number) => void;
//   removeFromFavorite: (id: number) => void;
//   bookmarked: number[];
//   setType: (test: any) => void;
//   categories: string[];
// }

export default function Favorites(props: PageData) {
  const [type, setType] = useState('choose category');
  const location = useLocation();
  const favorites = props.recipes;

  const updateType = (data: any) => {
    setType(data);
  };

  useEffect(() => {
    props.updateCategories(props.recipes);
    props.updateCurrentData(props.recipes);
  }, [location]);

  useEffect(() => {
    props.sortArray(type, props.recipes);
  }, [type]);

  useEffect(() => {
    props.updateCategories(props.recipes);
    props.updateCurrentData(props.recipes);
  }, [props.recipes]);

  return (
    <main>
      <header className={styles.test_header}>
        <h3>Favorites</h3>
        <Sort setType={updateType} category={props.categories} />
      </header>

      <Posts
        addToFavorite={props.addToFavorites}
        removeFromFavorite={props.removeFromFavorites}
        bookmarked={props.favorites}
        posts={props.currentData}
      />
    </main>
  );
}
